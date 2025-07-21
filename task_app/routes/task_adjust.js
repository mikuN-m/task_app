const express = require('express');
const router = express.Router();
const db = require('../models/dbModel');
const requireLogin = require('../middlewares/auth');

router.get('/',requireLogin,(req,res)=>{
  const tasks = db.prepare('select * from tasks where userId = ?').all(req.session.userId);
  const cap = req.session.capacity;

  
});

/**
 * タスク構成を作る関数
 * @param {Array} tasks - ユーザーの全タスク
 * @param {number} capacity - 今日のキャパシティ
 * @returns {Array} - 今日のタスクリスト
 */
function buildTaskPlan(tasks, capacity) {
  const result = [];
  let remainingCapacity = capacity;

  // 1. 固定タスクを先に全部入れる
  const fixedTasks = tasks.filter(task => task.isFixed);
  for (const task of fixedTasks) {
    result.push(task);
    remainingCapacity -= task.fatigue;
  }

  // 2. 可変タスクをfatigueLevelごとにバスケットに分ける
  const buckets = new Map();
  for (let level = 1; level <= 5; level++) {
    buckets.set(level, []);
  }

  tasks
    .filter(task => !task.isFixed)
    .forEach(task => {
      if (!buckets.has(task.fatigueLevel)) {
        buckets.set(task.fatigueLevel, []);
      }
      buckets.get(task.fatigueLevel).push(task);
    });

  // 各バスケットをpriority順に並べ替え
  for (const [level, list] of buckets) {
    list.sort((a, b) => b.priority - a.priority);
  }

  // 3. バランスよくピックして詰める
  let exhausted = false;
  while (!exhausted && remainingCapacity > 0) {
    exhausted = true;  // どのバスケットからも取れなかったら終わる

    for (let level = 1; level <= 5; level++) {
      const bucket = buckets.get(level);
      if (!bucket || bucket.length === 0) continue;

      // バスケットから最優先のタスクを取る
      const candidate = bucket[0];

      if (candidate.fatigue <= remainingCapacity) {
        result.push(candidate);
        remainingCapacity -= candidate.fatigue;
        bucket.shift();  // 取り除く
        exhausted = false;
      }
    }
  }

  return result;
}