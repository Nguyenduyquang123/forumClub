const Footer = () => {
  return (
    <footer className="w-full border-t border-slate-200 dark:border-slate-800 bg-card-light dark:bg-card-dark mt-auto">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            © 2024 ForumClub. Mọi quyền được bảo lưu.
          </p>
          <div className="flex items-center gap-4">
            <a
              className="text-sm text-slate-500 dark:text-slate-400 hover:text-primary dark:hover:text-primary/90"
              href="#"
            >
              Điều khoản
            </a>
            <a
              className="text-sm text-slate-500 dark:text-slate-400 hover:text-primary dark:hover:text-primary/90"
              href="#"
            >
              Bảo mật
            </a>
            <a
              className="text-sm text-slate-500 dark:text-slate-400 hover:text-primary dark:hover:text-primary/90"
              href="#"
            >
              Liên hệ
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
