import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-emerald-900 text-emerald-100 w-full bottom-0 absolute-bottom " dir="rtl">
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div className="text-right">
            <h3 className="text-xl font-bold mb-4 font-arabic text-white">عن الدار</h3>
            <p className="text-sm text-emerald-200">
              دار الإتقان لتعليم القرآن هي مؤسسة تعليمية متخصصة في تعليم القرآن الكريم وعلومه، نسعى لتقديم أفضل الخدمات التعليمية لطلابنا.
            </p>
          </div>

          {/* Quick Links */}
          <div className="text-right">
            <h3 className="text-xl font-bold mb-4 font-arabic text-white">روابط سريعة</h3>
            <ul className="space-y-2">
              <li><a href="/" className="text-sm hover:text-white transition-colors">الرئيسية</a></li>
              <li><a href="/courses" className="text-sm hover:text-white transition-colors">الدورات</a></li>
              <li><a href="/teachers" className="text-sm hover:text-white transition-colors">المعلمون</a></li>
              <li><a href="/about" className="text-sm hover:text-white transition-colors">من نحن</a></li>
              <li><a href="/contact" className="text-sm hover:text-white transition-colors">تواصل معنا</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="text-right">
            <h3 className="text-xl font-bold mb-4 font-arabic text-white">معلومات التواصل</h3>
            <div className="space-y-2 text-sm text-emerald-200">
              <p>البريد الإلكتروني: info@daritqan.com</p>
              <p>الهاتف: 972592889891+  </p>
              <div className="flex space-x-4 mt-4 justify-end">
                <a href="#" className="hover:text-white transition-colors">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" className="hover:text-white transition-colors">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="#" className="hover:text-white transition-colors">
                  <i className="fab fa-telegram"></i>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-emerald-800 mt-8 pt-8 text-center text-sm text-emerald-200">
          <p>جميع الحقوق محفوظة  لدار الإتقان لتعليم القرآن  {new Date().getFullYear()} © </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
