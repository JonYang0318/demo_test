# 使用官方 Playwright Python 基礎鏡像
FROM mcr.microsoft.com/playwright/python:v1.52.0-jammy


# 設定工作目錄
WORKDIR /app


# 複製專案進 container
COPY . /app


# 安裝系統依賴 + k6
RUN apt-get update && apt-get install -y \
    wget \
    curl \
    gnupg \
    libnss3 \
    libatk-bridge2.0-0 \
    libgtk-3-0 \
    libx11-xcb1 \
    libxcomposite1 \
    libxdamage1 \
    libxrandr2 \
    libasound2 \
    libpangocairo-1.0-0 \
    libxss1 \
    libgbm1 \
    && rm -rf /var/lib/apt/lists/*



# 安裝 k6
RUN gpg -k && \
    gpg --no-default-keyring \
    --keyring /usr/share/keyrings/k6-archive-keyring.gpg \
    --keyserver hkp://keyserver.ubuntu.com:80 \
    --recv-keys C5AD17C747E3415A3642D57D77C6C491D6AC1D69 && \
    echo "deb [signed-by=/usr/share/keyrings/k6-archive-keyring.gpg] https://dl.k6.io/deb stable main" \
    | tee /etc/apt/sources.list.d/k6.list && \
    apt-get update && \
    apt-get install -y k6 && \
    rm -rf /var/lib/apt/lists/*



# 安裝 Python 套件
RUN pip install --upgrade pip

RUN pip install -r requirements.txt



# 安裝 Playwright browser
RUN playwright install --with-deps



# 預設執行 pytest
CMD ["pytest"]