Weather App:

یک اپلیکیشن پیش‌بینی وضعیت آب و هوا که اطلاعات آب و هوا را برای هر شهر از طریق OpenWeatherMap API نمایش می‌دهد. این اپلیکیشن اطلاعات مربوط به وضعیت کنونی آب و هوا و پیش‌بینی وضعیت برای چند روز آینده را در اختیار کاربران قرار می‌دهد.


---

ویژگی‌ها

نمایش وضعیت کنونی آب و هوا شامل دما، رطوبت، سرعت باد، و شرایط آب و هوا

پیش‌بینی وضعیت آب و هوا برای چند روز آینده، به‌خصوص پیش‌بینی برای ساعت 12 ظهر

امکان جستجوی شهرها برای نمایش وضعیت آب و هوا

چالش‌ها و مشکلات حل‌شده

مشکل اول: در ابتدا، داده‌ها به درستی از API دریافت نمی‌شدند به دلیل تنظیمات نادرست URL. این مشکل با تنظیم صحیح پارامترها برطرف شد.

مشکل دوم: هنگام دریافت پیش‌بینی‌ها، داده‌های غیر ضروری نیز دریافت می‌شدند که با فیلتر کردن داده‌ها تنها پیش‌بینی‌های برای ساعت 12 روزهای آینده را نمایش دادیم.

