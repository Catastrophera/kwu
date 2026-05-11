# Product Requirements Document (PRD): IT Self-Sticker

**Project Name:** IT Self-Sticker
**Platform:** Web Application (Mobile-Responsive)
**Visual Style:** Ukiyo-e Cyberpunk / P.U.N.K. Aesthetic Yu-Gi-Oh Archetype (Neon Pink, Glitch Effects, Bold Layout)

---

## 1. Project Overview
Platform e-commerce yang mengkhususkan diri pada penjualan stiker laptop bertema IT. Proyek ini dirancang untuk tugas kewirausahaan dengan mengedepankan pengalaman belanja yang unik melalui fitur Jual Beli Sticker  IT dan memiliki fitur Gacha stiker IT  dengan harga tertentu (seperti booster pack yugioh) dan sistem transaksi yang terintegrasi secara otomatis. Stiker Yang dijual ialah (Stiker Bahasa Pemrogaman atau hal hal berbau komputer)

---

## 2. Core Business Logic

### A. User Management
* **Auth System:** Registrasi dan Login menggunakan Email/Password. Tetapi jika hanya masuk web tak perlu login
* **Session:** User wajib masuk ke akun untuk melakukan checkout atau menggunakan fitur Gacha.
* **History:** Halaman untuk memantau status pesanan dan daftar produk yang telah dibeli.

### B. Catalog & Gacha Mechanics
* **Katalog Produk:** Daftar stiker dengan deskripsi kualitas (Waterproof, Lem Kuat, Detail Tinggi).
* **Gacha Feature:** * User membeli satu tarikan gacha dengan harga diskon.
    * Sistem memilih satu produk secara acak dari database.
    * Animasi hasil gacha muncul setelah pembayaran diverifikasi.

### C. Payment & Transaction Flow
* **Automated Payment:** Integrasi Payment Gateway (Midtrans Sandbox) untuk simulasi transaksi nyata (QRIS/VA).
* **Payment Confirmation:** Status pesanan berubah otomatis dari 'Pending' ke 'Success' setelah transaksi selesai di sisi gateway.

### D. Logistics & Delivery
* **Shipping Policy:** Penerapan tarif ongkir tetap (Flat Rate) untuk mempermudah operasional.
* **Pickup A10:** Opsi pengambilan barang langsung di Gedung A10 Teknik Informatika tanpa biaya pengiriman.
* **Custom Request:** Integrasi tombol WhatsApp untuk konsultasi desain custom secara manual.

---

## 3. UI/UX Requirements
* **Theme:** Antarmuka Dark Mode dengan aksen neon pink dan cyan.
* **Mobile-First:** Tata letak yang dioptimalkan untuk penggunaan satu tangan di smartphone.
* **Components:** Card produk dengan gaya kartu koleksi dan tipografi tebal yang mencolok.

---

## 4. Database Schema
* **Users Table:** id, username, email, password
* **Products Table:** id, product_name, price, stock, image_path, is_gacha_eligible
* **Transactions Table:** id, user_id, total_amount, payment_status, shipping_type
* **Gacha_Logs Table:** id, user_id, product_id_received, created_at