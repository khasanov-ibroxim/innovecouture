# Payme Integratsiya Hujjati

## Amalga oshirilgan o'zgarishlar

### 1. API Types (`lib/api/types.ts`)
Qo'shilgan yangi interfacelar:
- `PaymentMethod` - to'lov usullari uchun
- `PaymentListResponse` - to'lov usullari ro'yxati javobi
- `OrderPayRequest` - to'lov tanlash so'rovi
- `OrderPayResponse` - to'lov tanlash javobi
- `PaymentUrlResponse` - to'lov havolasi javobi

### 2. API Client (`lib/api/client.ts`)
Qo'shilgan yangi metodlar:
- `getPaymentMethods()` - GET /api/payments/list
- `selectPayment()` - POST /api/order/pay
- `getPaymentUrl()` - GET /api/payment-url/{order_id}/{payment_system}

### 3. Success Page (`app/[lang]/order/[orderId]/success/page.tsx`)
Yangi sahifa yaratildi:
- To'lov muvaffaqiyatli tugagandan keyin ko'rsatiladigan sahifa
- Order ID ni ko'rsatadi
- Cash va online to'lovlar uchun turli xabarlar

### 4. Checkout Page (`app/[lang]/checkout/page.tsx`)
Yangilangan funksiyalar:
- `useEffect` - to'lov usullarini serverdan yuklash
- `handlePlaceOrder` - ikki bosqichli buyurtma jarayoni:
  1. Buyurtmani yaratish (POST /api/order)
  2. To'lov usulini tanlash (POST /api/order/pay)
  3. Payment URL ga yo'naltirish yoki success sahifaga o'tish

## Ishlash jarayoni

### Cash to'lov:
1. Foydalanuvchi "Cash" tanlaydi
2. Buyurtma yaratiladi
3. Bevosita success sahifaga yo'naltiriladi

### Payme/Click to'lov:
1. Foydalanuvchi "Payme" yoki "Click" tanlaydi
2. Buyurtma yaratiladi
3. `/api/order/pay` dan payment_url olinadi
4. Payme/Click sahifasiga yo'naltiriladi
5. To'lovdan keyin `/[lang]/order/{order_id}/success` ga qaytadi

## Muhim eslatmalar

- Backend `.env` faylida `PAYME_MERCHANT_ID`, `PAYME_SECRET_KEY`, `PUBLIC_BASE_URL` o'zgaruvchilari to'ldirilgan bo'lishi kerak
- `PUBLIC_BASE_URL` to'lovdan keyin qaytish URL prefiksi (masalan: `https://innovecouture.uz`)
- Payme yoqilmagan bo'lsa, `/api/payments/list` da `status: false` qaytadi va tugma ko'rinmaydi

## Test qilish

1. Development serverni ishga tushiring: `npm run dev`
2. Checkout sahifasiga o'ting
3. To'lov usullarini ko'ring (backend dan yuklanadi)
4. Buyurtma bering va to'lovni tekshiring

## Backend sozlamalari

Backend loyihasida quyidagilar bo'lishi kerak:
- `/api/payments/list` - to'lov usullari
- `/api/order` - buyurtma yaratish (payment parametrisiz)
- `/api/order/pay` - to'lov tanlash
- `/api/payme` - Payme webhook (faqat Payme serveri uchun)
