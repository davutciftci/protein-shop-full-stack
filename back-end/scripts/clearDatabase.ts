import prisma from '../src/utils/prisma';

/**
 * Veritabanındaki tüm verileri siler (yapıyı korur)
 * UYARI: Bu işlem geri alınamaz!
 */
async function clearAllData() {
    try {
        console.log('🗑️  Veritabanı temizleniyor...\n');

        // Sıralama önemli! Foreign key ilişkilerine göre ters sırada silme yapılmalı

        // 1. Order ile ilgili tablolar
        console.log('📦 Sipariş verileri siliniyor...');
        await prisma.orderItem.deleteMany({});
        console.log('  ✓ OrderItem tablosu temizlendi');
        
        await prisma.order.deleteMany({});
        console.log('  ✓ Order tablosu temizlendi');

        // 2. Cart ile ilgili tablolar
        console.log('\n🛒 Sepet verileri siliniyor...');
        await prisma.cartItem.deleteMany({});
        console.log('  ✓ CartItem tablosu temizlendi');
        
        await prisma.cart.deleteMany({});
        console.log('  ✓ Cart tablosu temizlendi');

        // 3. Product ile ilgili tablolar
        console.log('\n📦 Ürün verileri siliniyor...');
        await prisma.productComment.deleteMany({});
        console.log('  ✓ ProductComment tablosu temizlendi');
        
        await prisma.productPhoto.deleteMany({});
        console.log('  ✓ ProductPhoto tablosu temizlendi');
        
        await prisma.productVariant.deleteMany({});
        console.log('  ✓ ProductVariant tablosu temizlendi');
        
        await prisma.product.deleteMany({});
        console.log('  ✓ Product tablosu temizlendi');

        // 4. Category
        console.log('\n📁 Kategori verileri siliniyor...');
        await prisma.category.deleteMany({});
        console.log('  ✓ Category tablosu temizlendi');

        // 5. User ile ilgili tablolar
        console.log('\n👤 Kullanıcı verileri siliniyor...');
        await prisma.userAddress.deleteMany({});
        console.log('  ✓ UserAddress tablosu temizlendi');
        
        await prisma.user.deleteMany({});
        console.log('  ✓ User tablosu temizlendi');

        // 6. Diğer tablolar
        console.log('\n🚚 Kargo metodları siliniyor...');
        await prisma.shippingMethod.deleteMany({});
        console.log('  ✓ ShippingMethod tablosu temizlendi');

        console.log('\n✅ Tüm veriler başarıyla silindi!');
        console.log('📊 Veritabanı yapısı korundu.\n');

    } catch (error) {
        console.error('❌ Hata oluştu:', error);
        throw error;
    } finally {
        await prisma.$disconnect();
    }
}

// Script çalıştırma
clearAllData()
    .then(() => {
        console.log('✨ İşlem tamamlandı!');
        process.exit(0);
    })
    .catch((error) => {
        console.error('💥 İşlem başarısız:', error);
        process.exit(1);
    });
