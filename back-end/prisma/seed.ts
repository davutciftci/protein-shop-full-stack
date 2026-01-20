import { PrismaClient } from '../generated/prisma';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Seeding database...');

    // Admin kullanıcı oluştur
    const adminPassword = await bcrypt.hash('Admin123456', 10);
    const admin = await prisma.user.upsert({
        where: { email: 'admin@ojsnutrition.com' },
        update: {},
        create: {
            firstName: 'Admin',
            lastName: 'User',
            email: 'admin@ojsnutrition.com',
            hashedPassword: adminPassword,
            tcNo: '11111111111',
            birthDay: new Date('1990-01-01'),
            role: 'ADMIN',
        },
    });
    console.log('✅ Admin user created:', admin.email);

    // Kategorileri oluştur
    const categories = [
        { name: 'Protein', slug: 'protein', description: 'Protein takviyeleri ve ürünleri' },
        { name: 'Spor Gıdaları', slug: 'spor-gidalari', description: 'Spor beslenme ürünleri' },
        { name: 'Sağlık', slug: 'saglik', description: 'Sağlık takviyeleri' },
        { name: 'Gıda', slug: 'gida', description: 'Fonksiyonel gıda ürünleri' },
        { name: 'Vitamin', slug: 'vitamin', description: 'Vitamin ve mineral takviyeleri' },
        { name: 'Aksesuar', slug: 'aksesuar', description: 'Spor aksesuarları' },
    ];

    for (const cat of categories) {
        await prisma.category.upsert({
            where: { slug: cat.slug },
            update: {},
            create: cat,
        });
    }
    console.log('✅ Categories created');

    // Kategori ID'lerini al
    const proteinCat = await prisma.category.findUnique({ where: { slug: 'protein' } });
    const sporCat = await prisma.category.findUnique({ where: { slug: 'spor-gidalari' } });
    const saglikCat = await prisma.category.findUnique({ where: { slug: 'saglik' } });
    const gidaCat = await prisma.category.findUnique({ where: { slug: 'gida' } });
    const vitaminCat = await prisma.category.findUnique({ where: { slug: 'vitamin' } });

    if (!proteinCat || !sporCat || !saglikCat || !gidaCat || !vitaminCat) {
        throw new Error('Categories not found');
    }

    // Ürünleri oluştur
    const products = [
        {
            name: 'WHEY PROTEIN',
            slug: 'whey-protein',
            description: 'EN ÇOK TERCİH EDİLEN PROTEİN TAKVİYESİ. Her serviste 24g yüksek kaliteli protein, hızlı emilim özelliği, kas gelişimini destekler.',
            price: 549.00,
            stockCount: 100,
            categoryId: proteinCat.id,
            photo: '/uploads/products/whey-protein.jpg',
            variants: [
                { name: 'Bisküvi - 400G', sku: 'WP-BISKUVI-400', price: 549.00, stockCount: 50, attributes: { aroma: 'Bisküvi', size: '400G', servings: '16 servis' } },
                { name: 'Çikolata - 400G', sku: 'WP-CIKOLATA-400', price: 549.00, stockCount: 50, attributes: { aroma: 'Çikolata', size: '400G', servings: '16 servis' } },
                { name: 'Muz - 400G', sku: 'WP-MUZ-400', price: 549.00, stockCount: 50, attributes: { aroma: 'Muz', size: '400G', servings: '16 servis' } },
                { name: 'Bisküvi - 1.6KG', sku: 'WP-BISKUVI-1600', price: 1749.00, stockCount: 30, attributes: { aroma: 'Bisküvi', size: '1.6KG', servings: '64 servis' } },
                { name: 'Çikolata - 1.6KG', sku: 'WP-CIKOLATA-1600', price: 1749.00, stockCount: 30, attributes: { aroma: 'Çikolata', size: '1.6KG', servings: '64 servis' } },
            ],
        },
        {
            name: 'WHEY PROTEIN ISOLATE',
            slug: 'whey-isolate',
            description: 'YÜKSEK SAFİYETTE İZOLE PROTEİN. %90 protein saflığı, düşük laktoz içeriği, hızlı emilim.',
            price: 699.00,
            stockCount: 80,
            categoryId: proteinCat.id,
            photo: '/uploads/products/whey-isolate.jpg',
            variants: [
                { name: 'Vanilya - 400G', sku: 'WPI-VANILYA-400', price: 699.00, stockCount: 40, attributes: { aroma: 'Vanilya', size: '400G', servings: '16 servis' } },
                { name: 'Çikolata - 400G', sku: 'WPI-CIKOLATA-400', price: 699.00, stockCount: 40, attributes: { aroma: 'Çikolata', size: '400G', servings: '16 servis' } },
            ],
        },
        {
            name: 'MICELLAR CASEIN',
            slug: 'micellar-casein',
            description: 'GECE BOYU PROTEİN DESTEĞİ. Yavaş salınımlı protein, gece boyunca kas beslenmesi sağlar.',
            price: 649.00,
            stockCount: 60,
            categoryId: proteinCat.id,
            photo: '/uploads/products/micellar-casein.jpg',
            variants: [
                { name: 'Çikolata - 500G', sku: 'MC-CIKOLATA-500', price: 649.00, stockCount: 30, attributes: { aroma: 'Çikolata', size: '500G', servings: '20 servis' } },
                { name: 'Vanilya - 500G', sku: 'MC-VANILYA-500', price: 649.00, stockCount: 30, attributes: { aroma: 'Vanilya', size: '500G', servings: '20 servis' } },
            ],
        },
        {
            name: 'MILK PROTEIN',
            slug: 'milk-protein',
            description: 'DOĞAL SÜT PROTEİNİ. Kazein ve whey karışımı, dengeli amino asit profili.',
            price: 599.00,
            stockCount: 70,
            categoryId: proteinCat.id,
            photo: '/uploads/products/milk-protein.png',
            variants: [
                { name: 'Doğal - 500G', sku: 'MP-DOGAL-500', price: 599.00, stockCount: 35, attributes: { aroma: 'Doğal', size: '500G', servings: '20 servis' } },
                { name: 'Çikolata - 500G', sku: 'MP-CIKOLATA-500', price: 599.00, stockCount: 35, attributes: { aroma: 'Çikolata', size: '500G', servings: '20 servis' } },
            ],
        },
        {
            name: 'PEA PROTEIN',
            slug: 'pea-protein',
            description: 'BİTKİSEL PROTEİN TAKVİYESİ. %100 bezelye proteini, vegan dostu, kolay sindirilebilir.',
            price: 449.00,
            stockCount: 50,
            categoryId: proteinCat.id,
            photo: '/uploads/products/pea-protein.jpg',
            variants: [
                { name: 'Doğal - 400G', sku: 'PP-DOGAL-400', price: 449.00, stockCount: 25, attributes: { aroma: 'Doğal', size: '400G', servings: '16 servis' } },
                { name: 'Çikolata - 400G', sku: 'PP-CIKOLATA-400', price: 449.00, stockCount: 25, attributes: { aroma: 'Çikolata', size: '400G', servings: '16 servis' } },
            ],
        },
        {
            name: 'SOYA PROTEIN',
            slug: 'soya-protein',
            description: 'BİTKİSEL SOYA PROTEİNİ. Tam amino asit profili, vegan dostu protein kaynağı.',
            price: 399.00,
            stockCount: 45,
            categoryId: proteinCat.id,
            photo: '/uploads/products/soya-protein.png',
            variants: [
                { name: 'Doğal - 400G', sku: 'SP-DOGAL-400', price: 399.00, stockCount: 22, attributes: { aroma: 'Doğal', size: '400G', servings: '16 servis' } },
                { name: 'Vanilya - 400G', sku: 'SP-VANILYA-400', price: 399.00, stockCount: 23, attributes: { aroma: 'Vanilya', size: '400G', servings: '16 servis' } },
            ],
        },
        {
            name: 'EGG WHITE POWDER',
            slug: 'egg-white-powder',
            description: 'YUMURTA BEYAZI TOZU. Doğal protein kaynağı, yüksek biyoyararlanım.',
            price: 549.00,
            stockCount: 40,
            categoryId: proteinCat.id,
            photo: '/uploads/products/egg-white-powder.jpg',
            variants: [
                { name: 'Doğal - 400G', sku: 'EWP-DOGAL-400', price: 549.00, stockCount: 20, attributes: { aroma: 'Doğal', size: '400G', servings: '16 servis' } },
            ],
        },
        {
            name: 'FITNESS PACKAGE',
            slug: 'fitness-package',
            description: 'KOMPLE FİTNESS PAKETİ. Whey protein, creatine ve BCAA içeren avantajlı paket.',
            price: 1299.00,
            stockCount: 25,
            categoryId: sporCat.id,
            photo: '/uploads/products/fitness-package.jpg',
            variants: [
                { name: 'Standart Paket', sku: 'FP-STANDART', price: 1299.00, stockCount: 25, attributes: { type: 'Paket', contents: 'Whey + Creatine + BCAA' } },
            ],
        },
        {
            name: 'MASS GAINER',
            slug: 'mass-gainer',
            description: 'KİLO VE KAS KAZANIMI. Yüksek kalorili formül, karbonhidrat ve protein kombinasyonu.',
            price: 799.00,
            stockCount: 35,
            categoryId: sporCat.id,
            photo: '/uploads/products/mass-gainer-lansman.png',
            variants: [
                { name: 'Çikolata - 2KG', sku: 'MG-CIKOLATA-2000', price: 799.00, stockCount: 18, attributes: { aroma: 'Çikolata', size: '2KG', servings: '20 servis' } },
                { name: 'Vanilya - 2KG', sku: 'MG-VANILYA-2000', price: 799.00, stockCount: 17, attributes: { aroma: 'Vanilya', size: '2KG', servings: '20 servis' } },
            ],
        },
        {
            name: 'COLLAGEN',
            slug: 'collagen',
            description: 'CİLT VE EKLEM SAĞLIĞI. Tip I, II, III kolajen peptitleri, güzellik ve sağlık için.',
            price: 399.00,
            stockCount: 60,
            categoryId: saglikCat.id,
            photo: '/uploads/products/collagen.png',
            variants: [
                { name: 'Doğal - 300G', sku: 'COL-DOGAL-300', price: 399.00, stockCount: 30, attributes: { aroma: 'Doğal', size: '300G', servings: '30 servis' } },
                { name: 'Limon - 300G', sku: 'COL-LIMON-300', price: 399.00, stockCount: 30, attributes: { aroma: 'Limon', size: '300G', servings: '30 servis' } },
            ],
        },
        {
            name: 'COLLAGEN COFFEE',
            slug: 'collagen-coffee',
            description: 'KOLAJENLI KAHVE. Günlük kolajen ihtiyacınız lezzetli kahve ile buluşuyor.',
            price: 299.00,
            stockCount: 40,
            categoryId: gidaCat.id,
            photo: '/uploads/products/collagen-coffee.png',
            variants: [
                { name: 'Kahve - 200G', sku: 'CC-KAHVE-200', price: 299.00, stockCount: 40, attributes: { aroma: 'Kahve', size: '200G', servings: '20 servis' } },
            ],
        },
        {
            name: 'PROTEIN BAR',
            slug: 'protein-bar',
            description: 'PROTEİN BAR. Pratik protein kaynağı, lezzetli ve doyurucu atıştırmalık.',
            price: 39.00,
            stockCount: 200,
            categoryId: gidaCat.id,
            photo: '/uploads/products/protein-bar.png',
            variants: [
                { name: 'Çikolata - Tekli', sku: 'PB-CIKOLATA-1', price: 39.00, stockCount: 100, attributes: { aroma: 'Çikolata', size: '60G', quantity: '1 adet' } },
                { name: 'Fıstık - Tekli', sku: 'PB-FISTIK-1', price: 39.00, stockCount: 100, attributes: { aroma: 'Fıstık', size: '60G', quantity: '1 adet' } },
            ],
        },
        {
            name: 'PROTEIN BAR 2 PAKET',
            slug: 'protein-bar-2paket',
            description: 'PROTEİN BAR İKİLİ PAKET. 2 adet protein bar avantajlı fiyatla.',
            price: 69.00,
            stockCount: 80,
            categoryId: gidaCat.id,
            photo: '/uploads/products/protein-bar-2paket.png',
            variants: [
                { name: 'Mix - 2li Paket', sku: 'PB-MIX-2', price: 69.00, stockCount: 80, attributes: { aroma: 'Mix', size: '120G', quantity: '2 adet' } },
            ],
        },
    ];

    for (const productData of products) {
        const { variants, photo, ...productInfo } = productData;

        const existingProduct = await prisma.product.findUnique({
            where: { slug: productInfo.slug },
        });

        if (existingProduct) {
            console.log(`⏭️ Product already exists: ${productInfo.name}`);
            continue;
        }

        const product = await prisma.product.create({
            data: productInfo,
        });

        // Ürün fotoğrafı ekle
        await prisma.productPhoto.create({
            data: {
                productId: product.id,
                url: photo,
                altText: product.name,
                isPrimary: true,
                displayOrder: 0,
            },
        });

        // Varyantları ekle
        for (const variant of variants) {
            await prisma.productVariant.create({
                data: {
                    ...variant,
                    productId: product.id,
                    attributes: variant.attributes,
                },
            });
        }

        console.log(`✅ Product created: ${product.name}`);
    }

    console.log('🎉 Seeding completed!');
}

main()
    .catch((e) => {
        console.error('❌ Seeding error:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
