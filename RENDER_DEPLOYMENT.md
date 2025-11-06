# Render Deployment Guide

## 🚀 როგორ ავტვირთოთ Render-ზე

### 1. GitHub რეპოზიტორიის მომზადება
```bash
git add .
git commit -m "Prepare for Render deployment"
git push origin main
```

### 2. Render-ზე დეპლოი
1. გადით [render.com](https://render.com) და შექმენით ანგარიში
2. დააჭირეთ "New +" ღილაკს და აირჩიეთ "Web Service"
3. დააკავშირეთ თქვენი GitHub რეპოზიტორია
4. მიუთითეთ შემდეგი პარამეტრები:
   - **Name**: `n8n-automation`
   - **Environment**: `Node`
   - **Build Command**: `npm run build`
   - **Start Command**: `npm start`
   - **Plan**: `Free`

### 3. გარემოს ცვლადების დაყენება
Render Dashboard-ში გადით "Environment" ტაბზე და დაყენეთ:

```
NODE_ENV=production
PORT=10000
SESSION_SECRET=[Generate new secret]
GMAIL_USER=business.nexflow@gmail.com
GMAIL_APP_PASSWORD=skkw tvss puyz payx
```

### 4. დეპლოი
დააჭირეთ "Create Web Service" ღილაკს და დაელოდეთ დეპლოის დასრულებას.

## 📋 შემოწმების სია

- [ ] GitHub რეპოზიტორია მომზადებულია
- [ ] Build წარმატებით მუშაობს ლოკალურად
- [ ] გარემოს ცვლადები დაყენებულია Render-ზე
- [ ] საიტი ჩაიტვირთება
- [ ] შეკვეთის ფორმა მუშაობს
- [ ] ელფოსტები იგზავნება
- [ ] ადმინ პანელი მუშაობს

## ⚠️ მნიშვნელოვანი შენიშვნები

1. **ფაილების ატვირთვა**: Render-ზე ფაილები არ ინახება მუდმივად. რეკომენდებულია AWS S3 ან Cloudinary-ს გამოყენება.

2. **მონაცემთა ბაზა**: ახლა მონაცემები ინახება მეხსიერებაში. რეკომენდებულია PostgreSQL-ის დაყენება.

3. **სესიები**: რეკომენდებულია Redis-ის გამოყენება სესიებისთვის.

## 🔧 პრობლემების გადაჭრა

### Build Error
```bash
# ლოკალურად შეამოწმეთ
npm run build
```

### Port Error
დარწმუნდით რომ სერვერი იყენებს `process.env.PORT` ცვლადს.

### Static Files Error
შეამოწმეთ რომ `dist/public` დირექტორია არსებობს build-ის შემდეგ.

## 📞 დახმარება

თუ პრობლემები გაქვთ, შეამოწმეთ:
1. Render Dashboard-ში Logs ტაბი
2. Build Logs დეტალები
3. Environment Variables სწორად არის დაყენებული
