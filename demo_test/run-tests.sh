#!/bin/bash

set -e

echo "[INFO] 載入環境變數..."
set -a
[ -f .env ] && source .env
set +a

echo "[INFO] 設定 Python 路徑與建立報告資料夾..."
export PYTHONPATH=/app
mkdir -p /app/test-result/allure-results
mkdir -p /app/test-result/allure-report

echo "[INFO] 執行 Pytest 並產出 Allure 原始報告..."
pytest tests/ -q --tb=short \
  --alluredir=/app/test-result/allure-results | tee /app/test-result/test-output.log

echo "[INFO] 使用 Allure CLI 產出 HTML 報告..."
allure generate /app/test-result/allure-results -o /app/test-result/allure-report --clean

echo "[INFO] 測試完成，Allure 報告已儲存於 /app/test-result/allure-report"

# 測試統計結果摘要
echo "[INFO] 測試結果總結："
summary=$(grep -o '[0-9]\+ failed, [0-9]\+ passed' /app/test-result/test-output.log || true)

if [ -n "$summary" ]; then
    summary_with_emoji=$(echo "$summary" | sed -E 's/([0-9]+) failed/❌ \1 failed/; s/([0-9]+) passed/✅ \1 passed/')
    echo "$summary_with_emoji"
else
    echo "✅   全數通過"
fi
