# 📖 API Dokümantasyonu

Protein Shop Backend API'sine ait tüm endpoint'lerin detaylı dokümantasyonu.

---

## 📋 İçindekiler

- [Genel Bilgiler](#genel-bilgiler)
- [Authentication](#authentication)
- [User Endpoints](#user-endpoints)
- [Category Endpoints](#category-endpoints)
- [Product Endpoints](#product-endpoints)
- [Product Variant Endpoints](#product-variant-endpoints)
- [Product Photo Endpoints](#product-photo-endpoints)
- [Product Comment Endpoints](#product-comment-endpoints)
- [User Address Endpoints](#user-address-endpoints)
- [Cart Endpoints](#cart-endpoints)
- [Order Endpoints](#order-endpoints)
- [Payment Endpoints](#payment-endpoints)
- [Admin Stats Endpoints](#admin-stats-endpoints)
- [Error Responses](#error-responses)

---

## 🌐 Genel Bilgiler

### Base URL
```
http://localhost:3000/api
```

### Response Format

**Başarılı Response:**
```json
{
  "status": "success",
  "message": "İşlem başarılı",
  "data": { ... }
}
```

**Hata Response:**
```json
{
  "status": "error",
  "message": "Hata mesajı",
  "errors": [ ... ]  // Validation hataları için
}
```

### Authentication

Bearer Token kullanılır:
```
Authorization: Bearer YOUR_JWT_TOKEN
```

---

## 🔐 Authentication

### Register
Yeni kullanıcı kaydı.

**Endpoint:** `POST /user/register`

**Access:** Public

**Request Body:**
```json
{
  "firstName": "Davut",
  "lastName": "Çiftçi",
  "email": "davut@example.com",
  "tcNo": "12345678901",
  "password": "Password123!",
  "birthDay": "1990-01-15"
}
```

**Response (201):**
```json
{
  "status": "success",
  "message": "Kayıt başarılı",
  "data": {
    "id": 1,
    "firstName": "Davut",
    "lastName": "Çiftçi",
    "email": "davut@example.com",
    "role": "CUSTOMER"
  }
}
```

---

### Login
Kullanıcı girişi.

**Endpoint:** `POST /user/login`

**Access:** Public

**Request Body:**
```json
{
  "email": "davut@example.com",
  "password": "Password123!"
}
```

**Response (200):**
```json
{
  "status": "success",
  "message": "Giriş başarılı",
  "data": {
    "user": {
      "id": 1,
      "firstName": "Davut",
      "email": "davut@example.com",
      "role": "CUSTOMER"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

---

## 👤 User Endpoints

### Get Current User
Oturum açmış kullanıcı bilgileri.

**Endpoint:** `GET /user/me`

**Access:** Private

**Headers:**
```
Authorization: Bearer TOKEN
```

**Response (200):**
```json
{
  "status": "success",
  "data": {
    "id": 1,
    "firstName": "Davut",
    "lastName": "Çiftçi",
    "email": "davut@example.com",
    "role": "CUSTOMER"
  }
}
```

---

## 📂 Category Endpoints

### List Categories
Tüm kategorileri listele.

**Endpoint:** `GET /categories`

**Access:** Public

**Query Params:**
- `activeOnly` (boolean, optional) - Sadece aktif kategoriler

**Response (200):**
```json
{
  "status": "success",
  "results": 3,
  "data": [
    {
      "id": 1,
      "name": "Whey Protein",
      "slug": "whey-protein",
      "description": "...",
      "isActive": true
    }
  ]
}
```

---

### Get Category
Tek bir kategori getir.

**Endpoint:** `GET /categories/:id`

**Access:** Public

**Response (200):**
```json
{
  "status": "success",
  "data": {
    "id": 1,
    "name": "Whey Protein",
    "slug": "whey-protein",
    "isActive": true
  }
}
```

---

### Create Category
Yeni kategori oluştur.

**Endpoint:** `POST /categories`

**Access:** Private (Admin only)

**Request Body:**
```json
{
  "name": "BCAA",
  "slug": "bcaa",
  "description": "Branched-Chain Amino Acids"
}
```

**Response (201):**
```json
{
  "status": "success",
  "message": "Kategori başarıyla oluşturuldu",
  "data": { ... }
}
```

---

### Update Category
Kategori güncelle.

**Endpoint:** `PUT /categories/:id`

**Access:** Private (Admin only)

**Request Body:**
```json
{
  "name": "BCAA+",
  "isActive": true
}
```

---

### Delete Category
Kategori sil.

**Endpoint:** `DELETE /categories/:id`

**Access:** Private (Admin only)

**Response (204):** No content

---

## 🛍 Product Endpoints

### List Products
Tüm ürünleri listele.

**Endpoint:** `GET /products`

**Access:** Public

**Query Params:**
- `categoryId` (number, optional)
- `activeOnly` (boolean, optional)
- `minPrice` (number, optional)
- `maxPrice` (number, optional)

**Response (200):**
```json
{
  "status": "success",
  "results": 10,
  "data": [
    {
      "id": 1,
      "name": "Whey Protein Gold Standard",
      "slug": "whey-protein-gold",
      "price": "299.99",
      "category": { ... },
      "photos": [ ... ],
      "variants": [ ... ]
    }
  ]
}
```

---

### Search Products
Gelişmiş ürün arama.

**Endpoint:** `GET /products/search`

**Access:** Public

**Query Params:**
- `search` (string) - Ürün adında ara
- `categoryId` (number)
- `minPrice` (number)
- `maxPrice` (number)
- `activeOnly` (boolean)
- `sortBy` (string) - price_asc, price_desc, name_asc, name_desc, newest, oldest

**Example:**
```
GET /products/search?search=whey&categoryId=1&sortBy=price_asc
```

---

### Paginated Products
Sayfalı ürün listesi.

**Endpoint:** `GET /products/paginated`

**Access:** Public

**Query Params:**
- `page` (number, default: 1)
- `limit` (number, default: 12)
- Arama parametreleri (search, categoryId, etc.)

**Response (200):**
```json
{
  "status": "success",
  "data": [ ... ],
  "pagination": {
    "currentPage": 1,
    "totalPages": 5,
    "totalProducts": 58,
    "productsPerPage": 12,
    "hasNextPage": true,
    "hasPreviousPage": false
  }
}
```

---

### Get Product
Tek ürün detayı.

**Endpoint:** `GET /products/:id`

**Access:** Public

---

### Create Product
Yeni ürün oluştur.

**Endpoint:** `POST /products`

**Access:** Private (Admin only)

**Request Body:**
```json
{
  "name": "Whey Protein 1kg",
  "slug": "whey-protein-1kg",
  "description": "En kaliteli whey protein",
  "price": 299.99,
  "stockCount": 50,
  "categoryId": 1
}
```

---

### Update Product
Ürün güncelle.

**Endpoint:** `PUT /products/:id`

**Access:** Private (Admin only)

---

### Delete Product
Ürün sil.

**Endpoint:** `DELETE /products/:id`

**Access:** Private (Admin only)

---

## 🔀 Product Variant Endpoints

### Get Product Variants
Ürünün tüm varyantları.

**Endpoint:** `GET /variants/product/:productId`

**Access:** Public

---

### Get Variant
Tek varyant.

**Endpoint:** `GET /variants/:id`

**Access:** Public

---

### Create Variant
Yeni varyant oluştur.

**Endpoint:** `POST /variants`

**Access:** Private (Admin only)

**Request Body:**
```json
{
  "name": "1kg Çikolata",
  "sku": "WP-1KG-CHOC",
  "price": 299.99,
  "stockCount": 50,
  "productId": 1,
  "attributes": {
    "weight": "1kg",
    "flavor": "Chocolate"
  }
}
```

---

### Update Variant
Varyant güncelle.

**Endpoint:** `PUT /variants/:id`

**Access:** Private (Admin only)

---

### Delete Variant
Varyant sil.

**Endpoint:** `DELETE /variants/:id`

**Access:** Private (Admin only)

---

## 📷 Product Photo Endpoints

### Get Product Photos
Ürünün tüm fotoğrafları.

**Endpoint:** `GET /photos/product/:productId`

**Access:** Public

---

### Upload Photo
Fotoğraf yükle.

**Endpoint:** `POST /photos/upload`

**Access:** Private (Admin only)

**Content-Type:** `multipart/form-data`

**Form Fields:**
- `photo` (file) - Image file
- `productId` (number)
- `altText` (string, optional)
- `isPrimary` (boolean, optional)
- `displayOrder` (number, optional)

---

### Create Photo (URL)
URL ile fotoğraf ekle.

**Endpoint:** `POST /photos`

**Access:** Private (Admin only)

**Request Body:**
```json
{
  "url": "/uploads/photo-123456.jpg",
  "altText": "Ürün ön görünüm",
  "isPrimary": true,
  "displayOrder": 1,
  "productId": 1
}
```

---

### Update Photo
Fotoğraf güncelle.

**Endpoint:** `PUT /photos/:id`

**Access:** Private (Admin only)

---

### Delete Photo
Fotoğraf sil.

**Endpoint:** `DELETE /photos/:id`

**Access:** Private (Admin only)

---

## 💬 Product Comment Endpoints

### Get Product Comments
Ürünün onaylı yorumları.

**Endpoint:** `GET /comments/product/:productId`

**Access:** Public

---

### Get My Comments
Kullanıcının kendi yorumları.

**Endpoint:** `GET /comments/my/comments`

**Access:** Private

---

### Create Comment
Yeni yorum ekle.

**Endpoint:** `POST /comments`

**Access:** Private

**Request Body:**
```json
{
  "rating": 5,
  "comment": "Harika bir ürün, tavsiye ederim!",
  "productId": 1
}
```

---

### Update Comment
Yorumu güncelle.

**Endpoint:** `PUT /comments/:id`

**Access:** Private (Own comment only)

---

### Delete Comment
Yorum sil.

**Endpoint:** `DELETE /comments/:id`

**Access:** Private (Own comment or Admin)

---

### Approve Comment
Yorumu onayla/reddet.

**Endpoint:** `PATCH /comments/:id/approve`

**Access:** Private (Admin only)

**Request Body:**
```json
{
  "isApproved": true
}
```

---

### Get All Comments (Admin)
Tüm yorumlar (onaysız dahil).

**Endpoint:** `GET /comments/admin/all`

**Access:** Private (Admin only)

**Query Params:**
- `productId` (number, optional)

---

## 📍 User Address Endpoints

### Get My Addresses
Kullanıcının adresleri.

**Endpoint:** `GET /addresses/my`

**Access:** Private

---

### Get Address
Tek adres.

**Endpoint:** `GET /addresses/:id`

**Access:** Private

---

### Create Address
Yeni adres ekle.

**Endpoint:** `POST /addresses`

**Access:** Private

**Request Body:**
```json
{
  "title": "Ev",
  "fullName": "Davut Çiftçi",
  "phoneNumber": "5551234567",
  "addressLine1": "Atatürk Mah. Cumhuriyet Cad. No:123",
  "addressLine2": "Daire: 5",
  "city": "İstanbul",
  "district": "Kadıköy",
  "postalCode": "34710",
  "isDefault": true
}
```

---

### Update Address
Adres güncelle.

**Endpoint:** `PUT /addresses/:id`

**Access:** Private

---

### Delete Address
Adres sil.

**Endpoint:** `DELETE /addresses/:id`

**Access:** Private

---

## 🛒 Cart Endpoints

### Get Cart
Sepeti görüntüle.

**Endpoint:** `GET /cart`

**Access:** Private

**Response (200):**
```json
{
  "status": "success",
  "data": {
    "cart": {
      "id": 1,
      "items": [
        {
          "id": 1,
          "quantity": 2,
          "variant": {
            "name": "1kg Çikolata",
            "price": "299.99",
            "product": { ... }
          }
        }
      ]
    },
    "summary": {
      "itemCount": 2,
      "totalPrice": "599.98"
    }
  }
}
```

---

### Add to Cart
Sepete ürün ekle.

**Endpoint:** `POST /cart/items`

**Access:** Private

**Request Body:**
```json
{
  "variantId": 1,
  "quantity": 2
}
```

---

### Update Cart Item
Sepetteki ürün miktarını güncelle.

**Endpoint:** `PUT /cart/items/:itemId`

**Access:** Private

**Request Body:**
```json
{
  "quantity": 5
}
```

---

### Remove from Cart
Sepetten ürün çıkar.

**Endpoint:** `DELETE /cart/items/:itemId`

**Access:** Private

---

### Clear Cart
Sepeti temizle.

**Endpoint:** `DELETE /cart`

**Access:** Private

---

## 📦 Order Endpoints

### Get My Orders
Kullanıcının siparişleri.

**Endpoint:** `GET /orders/my`

**Access:** Private

---

### Get Order
Tek sipariş.

**Endpoint:** `GET /orders/:id`

**Access:** Private (Own order or Admin)

---

### Create Order
Yeni sipariş oluştur.

**Endpoint:** `POST /orders`

**Access:** Private

**Request Body:**
```json
{
  "addressId": 1,
  "paymentMethod": "credit_card"
}
```

**Response (201):**
```json
{
  "status": "success",
  "message": "Siparişiniz başarıyla oluşturuldu",
  "data": {
    "id": 1,
    "orderNumber": "ORD-2026-0001",
    "status": "PENDING",
    "subtotal": "299.99",
    "shippingCost": "50.00",
    "taxAmount": "62.998",
    "totalAmount": "412.988",
    "items": [ ... ]
  }
}
```

---

### Update Order Status
Sipariş durumu güncelle.

**Endpoint:** `PATCH /orders/:id/status`

**Access:** Private (Admin only)

**Request Body:**
```json
{
  "status": "SHIPPED",
  "trackingNumber": "1234567890"
}
```

**Statuses:**
- `PENDING` - Beklemede
- `CONFIRMED` - Onaylandı
- `PREPARING` - Hazırlanıyor
- `SHIPPED` - Kargoya verildi
- `DELIVERED` - Teslim edildi
- `CANCELLED` - İptal edildi

---

### Cancel Order
Sipariş iptal et.

**Endpoint:** `POST /orders/:id/cancel`

**Access:** Private

**Request Body:**
```json
{
  "cancelReason": "Yanlışlıkla sipariş verdim"
}
```

---

### Get All Orders (Admin)
Tüm siparişler.

**Endpoint:** `GET /orders`

**Access:** Private (Admin only)

---

## 💳 Payment Endpoints

### Get Test Cards
Test kartı bilgileri.

**Endpoint:** `GET /payment/test-cards`

**Access:** Public

**Response (200):**
```json
{
  "status": "success",
  "message": "Test amaçlı kart bilgileri",
  "data": [
    {
      "name": "Visa Test Card",
      "cardNumber": "4111111111111111",
      "expireMonth": "12",
      "expireYear": "2030",
      "cvc": "123",
      "cardHolderName": "TEST USER",
      "description": "Her zaman başarılı"
    }
  ]
}
```

---

### Process Payment
Ödeme işle.

**Endpoint:** `POST /payment/process`

**Access:** Private

**Request Body:**
```json
{
  "orderId": 1,
  "cardDetails": {
    "cardHolderName": "Davut Ciftci",
    "cardNumber": "4111111111111111",
    "expireMonth": "12",
    "expireYear": "2030",
    "cvc": "123"
  }
}
```

**Success Response (200):**
```json
{
  "status": "success",
  "message": "Ödeme başarılı",
  "data": {
    "paymentId": "PAY-1736468123-ABC",
    "status": "SUCCESS",
    "amount": "299.99",
    "paidPrice": "412.988",
    "cardAssociation": "VISA",
    "lastFourDigits": "1111"
  }
}
```

**Failure Response (400):**
```json
{
  "status": "error",
  "message": "Ödeme başarısız",
  "data": {
    "status": "FAILURE",
    ...
  }
}
```

---

### Check Payment Status
Ödeme durumu sorgula.

**Endpoint:** `GET /payment/status/:orderId`

**Access:** Private

---

## 📊 Admin Stats Endpoints

### Dashboard Stats
Genel dashboard istatistikleri.

**Endpoint:** `GET /admin/stats/dashboard`

**Access:** Private (Admin only)

**Response (200):**
```json
{
  "status": "success",
  "data": {
    "users": {
      "total": 150
    },
    "products": {
      "total": 58,
      "lowStock": 5
    },
    "orders": {
      "total": 320,
      "pending": 12,
      "today": 8
    },
    "revenue": {
      "total": "45780.50",
      "today": "1250.00"
    }
  }
}
```

---

### Order Status Stats
Sipariş durum dağılımı.

**Endpoint:** `GET /admin/stats/order-status`

**Access:** Private (Admin only)

---

### Last 7 Days Sales
Son 7 günlük satış grafiği.

**Endpoint:** `GET /admin/stats/sales/7days`

**Access:** Private (Admin only)

---

### Top Selling Products
En çok satan ürünler.

**Endpoint:** `GET /admin/stats/top-products`

**Access:** Private (Admin only)

**Query Params:**
- `limit` (number, default: 10)

---

### Recent Users
Son kullanıcılar.

**Endpoint:** `GET /admin/stats/recent-users`

**Access:** Private (Admin only)

**Query Params:**
- `limit` (number, default: 10)

---

### Low Stock Products
Düşük stoklu ürünler.

**Endpoint:** `GET /admin/stats/low-stock`

**Access:** Private (Admin only)

**Query Params:**
- `threshold` (number, default: 10)

---

### Products by Category
Kategori dağılımı.

**Endpoint:** `GET /admin/stats/products-by-category`

**Access:** Private (Admin only)

---

### Monthly Revenue
Aylık gelir raporu.

**Endpoint:** `GET /admin/stats/monthly-revenue`

**Access:** Private (Admin only)

**Query Params:**
- `year` (number, default: current year)

---

## ❌ Error Responses

### 400 Bad Request
```json
{
  "status": "error",
  "message": "Geçersiz istek"
}
```

### 401 Unauthorized
```json
{
  "status": "error",
  "message": "Oturum açmanız gerekiyor"
}
```

### 403 Forbidden
```json
{
  "status": "error",
  "message": "Bu işlem için yetkiniz yok"
}
```

### 404 Not Found
```json
{
  "status": "error",
  "message": "Kaynak bulunamadı"
}
```

### 409 Conflict
```json
{
  "status": "error",
  "message": "Bu email zaten kullanılıyor"
}
```

### 422 Validation Error
```json
{
  "status": "error",
  "message": "Validasyon hatası",
  "errors": [
    {
      "field": "email",
      "message": "Geçerli bir email adresi girin"
    },
    {
      "field": "password",
      "message": "Şifre en az 8 karakter olmalı"
    }
  ]
}
```

### 500 Internal Server Error
```json
{
  "status": "error",
  "message": "Bir şeyler yanlış gitti"
}
```

---

## 📝 Notes

- Tüm tarihler ISO 8601 formatında döner
- Decimal değerler string olarak döner (örn: "299.99")
- Pagination default: page=1, limit=12
- File upload max size: 5MB
- Rate limiting: Yok (production için eklenebilir)

---

**Son Güncelleme:** 2026-01-15