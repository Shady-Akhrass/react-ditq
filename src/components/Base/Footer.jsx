import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-emerald-900 text-emerald-100 w-full mt-auto min-h-[400px] contain-paint relative" dir="rtl">
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8 flex flex-col h-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 flex-1">
          {/* Company Info */}
          <div className="text-right h-[150px] flex flex-col">
            <h3 className="text-xl font-bold mb-4 font-arabic text-white">عن الدار</h3>
            <p className="text-sm text-emerald-200 line-clamp-4 flex-1">
              دار الإتقان لتعليم القرآن هي مؤسسة تعليمية متخصصة في تعليم القرآن الكريم وعلومه، نسعى لتقديم أفضل الخدمات التعليمية لطلابنا.
            </p>
          </div>

          {/* Quick Links */}
          <div className="text-right h-[150px] flex flex-col">
            <h3 className="text-xl font-bold mb-4 font-arabic text-white">روابط سريعة</h3>
            <ul className="space-y-2 flex-1">
              <li><a href="/" className="text-sm hover:text-white transition-colors">الرئيسية</a></li>
              <li><a href="/course" className="text-sm hover:text-white transition-colors">قسم الدورات والتجويد والأسانيد</a></li>
              <li><a href="/clues" className="text-sm hover:text-white transition-colors">أدلة الدار</a></li>
              <li><a href="/speech" className="text-sm hover:text-white transition-colors">كلمة رئيس الدار</a></li>
              <li><a href="/contact-us" className="text-sm hover:text-white transition-colors">تواصل معنا</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="text-right h-[150px] flex flex-col">
            <h3 className="text-xl font-bold mb-4 font-arabic text-white">معلومات التواصل</h3>
            <div className="space-y-2 text-sm text-emerald-200 flex-1">
              <p>البريد الإلكتروني: info@daritqan.com</p>
              <p>الهاتف: 972592889891+  </p>
              <div className="flex gap-4 mt-4 justify-end">
                <a href="#" className="hover:text-white transition-colors w-6 h-6 flex items-center justify-center">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" className="hover:text-white transition-colors w-6 h-6 flex items-center justify-center">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="#" className="hover:text-white transition-colors w-6 h-6 flex items-center justify-center">
                  <i className="fab fa-telegram"></i>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-emerald-800 mt-8 pt-4 text-center text-sm text-emerald-200 h-[40px] flex items-center justify-center">
          <p>جميع الحقوق محفوظة  لدار الإتقان لتعليم القرآن  {new Date().getFullYear()} © </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
