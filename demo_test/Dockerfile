# 使用官方 Playwright Python 基礎鏡像
FROM mcr.microsoft.com/playwright/python:v1.52.0-jammy

# 設定工作目錄
WORKDIR /app

# 安裝中文 locale、Java（Allure CLI 依賴）和 dos2unix 工具
RUN apt-get update && apt-get install -y \
    locales \
    default-jre \
    wget \
    unzip \
    dos2unix \
    && locale-gen zh_CN.UTF-8 \
    && update-locale LANG=zh_CN.UTF-8 \
    && rm -rf /var/lib/apt/lists/*

# 設定環境變數
ENV LANG=zh_CN.UTF-8
ENV LANGUAGE=zh_CN:zh
ENV LC_ALL=zh_CN.UTF-8
ENV PATH="/opt/allure/bin:${PATH}"
ENV PYTHONPATH=/app

# 複製 requirements 並安裝 Python 套件
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# 安裝 Playwright 瀏覽器
RUN playwright install --with-deps

# 安裝 Allure CLI
RUN wget https://github.com/allure-framework/allure2/releases/download/2.27.0/allure-2.27.0.tgz && \
    tar -zxvf allure-2.27.0.tgz && \
    mv allure-2.27.0 /opt/allure && \
    rm allure-2.27.0.tgz

# 複製專案檔案
COPY . .

# 將 run-tests.sh 轉成 LF 換行並給執行權限
RUN dos2unix run-tests.sh && chmod +x run-tests.sh

# 預設執行測試
CMD ["/bin/bash", "/app/run-tests.sh"]
