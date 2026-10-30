document.addEventListener("DOMContentLoaded", function () {
    // 1. تحديث السنة الحالية في أسرع وقت في الفوتر
    const yearElement = document.getElementById("year");
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    // 2. البحث وتصنيف المنتجات
    const searchInput = document.getElementById("searchInput");
    const searchButton = document.getElementById("searchButton");
    const categoryButtons = document.querySelectorAll(".category-btn");
    const products = document.querySelectorAll(".product-card");
    const noProducts = document.getElementById("noProducts");

    let selectedCategory = "all";

    // دالة الفلترة
    function filterProducts() {
        if (!noProducts) return;

        const searchText = searchInput ? searchInput.value.trim().toLowerCase() : "";
        let visibleCount = 0;

        products.forEach(function (product) {
            // البحث داخل عنوان المنتج والوصف
            const productText = product.textContent.toLowerCase();
            const productCategory = product.dataset.category || "all";

            const matchesSearch = productText.includes(searchText);
            const matchesCategory =
                selectedCategory === "all" || productCategory === selectedCategory;

            if (matchesSearch && matchesCategory) {
                product.style.display = ""; // إعادة إظهار المنتج
                product.hidden = false;
                visibleCount++;
            } else {
                product.style.display = "none"; // إخفاء المنتج
                product.hidden = true;
            }
        });

        // إظهار أو إخفاء رسالة "لا توجد نتائج"
        if (noProducts) {
            noProducts.hidden = visibleCount !== 0;
            noProducts.style.display = visibleCount === 0 ? "block" : "none";
        }
    }

    // أحداث البحث
    if (searchButton) {
        searchButton.addEventListener("click", filterProducts);
    }

    if (searchInput) {
        searchInput.addEventListener("input", filterProducts);

        searchInput.addEventListener("keydown", function (event) {
            if (event.key === "Enter") {
                event.preventDefault();
                filterProducts();
            }
        });
    }

    // أحداث أزرار التصنيفات
    categoryButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            selectedCategory = button.dataset.category || "all";

            categoryButtons.forEach(function (item) {
                item.classList.remove("active");
            });

            button.classList.add("active");
            filterProducts();
        });
    });
});