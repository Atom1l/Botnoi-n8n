import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'en' | 'th';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

// Translation dictionary
const translations = {
  en: {
    // Navigation
    'nav.signIn': 'Sign In',
    'nav.profile': 'Profile',
    'nav.logout': 'Logout',
    'nav.documentation': 'Documentation',
    
    // Landing Page
    'landing.title': 'BOTNOi',
    'landing.subtitle': 'Easily convert any text into realistic speech, helping you work smoothly, finish tasks easily, and do it anywhere.',
    'landing.getStarted': 'Get Started',
    'landing.login': 'Log In',
    'landing.getapikey': 'Get API Key',
    'landing.tryit': 'Try it',
    'landing.logindetails': 'Log In with a simple click!',
    'landing.getapikeydetails': 'Get API Key and go to our website.',
    'landing.tryitdetails': 'Try our Botnoivoice <br/> Text-to-Speech',
    'landing.welcome': 'Welcome!',
    'landing.chooseSignIn': 'Choose your preferred sign-in method',
    'landing.continueWithGoogle': 'Continue with Google',
    'landing.continueWithLine': 'Continue with Line',
    'landing.continueWithEmail': 'Or continue with email',
    'landing.emailAddress': 'Email address',
    'landing.password': 'Password',
    'landing.enterEmail': 'Enter your email',
    'landing.enterPassword': 'Enter your password',
    'landing.signingIn': 'Signing in...',
    
    // Dashboard
    'dashboard.welcomeBack': 'Welcome back',
    'dashboard.subtitle': 'Manage your Voice API key and integrate with n8n',
    'dashboard.totalRequests': 'Total Requests',
    'dashboard.status': 'Status',
    'dashboard.active': 'Active',
    'dashboard.lastUsed': 'Last Used',
    'dashboard.never': 'Never',
    'dashboard.yourApiKey': 'Your API Key',
    'dashboard.regenerate': 'Regenerate',
    'dashboard.regenerating': 'Regenerating...',
    'dashboard.created': 'Created',
    'dashboard.requests': 'Requests',
    'dashboard.important': 'Important',
    'dashboard.securityNote': 'Keep your API key secure and never share it publicly. If you suspect it has been compromised, regenerate it immediately.',
    'dashboard.quickStart': 'Quick Start Guide',
    'dashboard.step1': 'Step 1: Copy API Key',
    'dashboard.step1Desc': 'Use the copy button above to get your API key',
    'dashboard.step2': 'Step 2: Add to n8n',
    'dashboard.step2Desc': 'Configure HTTP Request node with Authorization header',
    'dashboard.step3': 'Step 3: Start Building',
    'dashboard.step3Desc': 'Use the examples below to create your workflows',
    
    // Profile
    'profile.accountInfo': 'Account Information',
    'profile.emailAddress': 'Email Address',
    'profile.verified': 'Verified',
    'profile.accountCreated': 'Account Created',
    'profile.authMethod': 'Authentication Method',
    'profile.signIn': 'Sign-in',
    'profile.securitySettings': 'Security Settings',
    'profile.twoFactor': 'Two-Factor Authentication',
    'profile.twoFactorDesc': 'Add an extra layer of security to your account',
    'profile.enable': 'Enable',
    'profile.password': 'Password',
    'profile.changePassword': 'Change your account password',
    'profile.change': 'Change',
    'profile.activeSessions': 'Active Sessions',
    'profile.activeSessionsDesc': 'Manage your active sessions',
    'profile.view': 'View',
    'profile.dangerZone': 'Danger Zone',
    'profile.deleteAccount': 'Delete Account',
    'profile.deleteAccountDesc': 'Permanently delete your account and all associated data',
    
    // Language
    'language.english': 'English',
    'language.thai': 'ไทย'
  },
  th: {
    // Navigation
    'nav.signIn': 'เข้าสู่ระบบ',
    'nav.profile': 'โปรไฟล์',
    'nav.logout': 'ออกจากระบบ',
    'nav.documentation': 'เอกสาร',
    
    // Landing Page
    'landing.title': 'BOTNOi',
    'landing.subtitle': 'แปลงข้อความเป็นเสียงพูดที่สมจริงได้อย่างง่ายดาย ช่วยให้คุณทำงานได้อย่างราบรื่น เสร็จงานได้ง่าย และทำได้ทุกที่',
    'landing.getStarted': 'เริ่มต้นใช้งาน',
    'landing.login': 'เข้าสู่ระบบ',
    'landing.getapikey': 'รับ API Key',
    'landing.tryit': 'ทดลองใช้งาน',
    'landing.logindetails': 'เข้าสู่ระบบง่าย ในไม่กี่คลิก!',
    'landing.getapikeydetails': 'รับ API Key และ <br/> ไปยังเว็บไซต์ของเรา',
    'landing.tryitdetails': 'ทดลองใช้งาน Botnoivoice <br/> Text-to-Speech',
    'landing.welcome': 'ยินดีต้อนรับ!',
    'landing.chooseSignIn': 'เลือกวิธีการเข้าสู่ระบบที่คุณต้องการ',
    'landing.continueWithGoogle': 'ดำเนินการต่อด้วย Google',
    'landing.continueWithLine': 'ดำเนินการต่อด้วย Line',
    'landing.continueWithEmail': 'หรือดำเนินการต่อด้วยอีเมล',
    'landing.emailAddress': 'ที่อยู่อีเมล',
    'landing.password': 'รหัสผ่าน',
    'landing.enterEmail': 'กรอกอีเมลของคุณ',
    'landing.enterPassword': 'กรอกรหัสผ่านของคุณ',
    'landing.signingIn': 'กำลังเข้าสู่ระบบ...',
    
    // Dashboard
    'dashboard.welcomeBack': 'ยินดีต้อนรับกลับมา',
    'dashboard.subtitle': 'จัดการ API key สำหรับ Voice API และเชื่อมต่อกับ n8n',
    'dashboard.totalRequests': 'คำขอทั้งหมด',
    'dashboard.status': 'สถานะ',
    'dashboard.active': 'ใช้งานอยู่',
    'dashboard.lastUsed': 'ใช้งานล่าสุด',
    'dashboard.never': 'ไม่เคย',
    'dashboard.yourApiKey': 'API Key ของคุณ',
    'dashboard.regenerate': 'สร้างใหม่',
    'dashboard.regenerating': 'กำลังสร้างใหม่...',
    'dashboard.created': 'สร้างเมื่อ',
    'dashboard.requests': 'คำขอ',
    'dashboard.important': 'สำคัญ',
    'dashboard.securityNote': 'เก็บ API key ของคุณให้ปลอดภัยและอย่าแชร์ต่อสาธารณะ หากคุณสงสัยว่าถูกบุกรุก ให้สร้างใหม่ทันที',
    'dashboard.quickStart': 'คู่มือเริ่มต้นอย่างรวดเร็ว',
    'dashboard.step1': 'ขั้นตอนที่ 1: คัดลอก API Key',
    'dashboard.step1Desc': 'ใช้ปุ่มคัดลอกด้านบนเพื่อรับ API key ของคุณ',
    'dashboard.step2': 'ขั้นตอนที่ 2: เพิ่มใน n8n',
    'dashboard.step2Desc': 'กำหนดค่า HTTP Request node ด้วย Authorization header',
    'dashboard.step3': 'ขั้นตอนที่ 3: เริ่มสร้าง',
    'dashboard.step3Desc': 'ใช้ตัวอย่างด้านล่างเพื่อสร้าง workflow ของคุณ',
    
    // Profile
    'profile.accountInfo': 'ข้อมูลบัญชี',
    'profile.emailAddress': 'ที่อยู่อีเมล',
    'profile.verified': 'ยืนยันแล้ว',
    'profile.accountCreated': 'สร้างบัญชีเมื่อ',
    'profile.authMethod': 'วิธีการยืนยันตัวตน',
    'profile.signIn': 'เข้าสู่ระบบ',
    'profile.securitySettings': 'การตั้งค่าความปลอดภัย',
    'profile.twoFactor': 'การยืนยันตัวตนสองขั้นตอน',
    'profile.twoFactorDesc': 'เพิ่มความปลอดภัยให้กับบัญชีของคุณ',
    'profile.enable': 'เปิดใช้งาน',
    'profile.password': 'รหัสผ่าน',
    'profile.changePassword': 'เปลี่ยนรหัสผ่านบัญชีของคุณ',
    'profile.change': 'เปลี่ยน',
    'profile.activeSessions': 'เซสชันที่ใช้งานอยู่',
    'profile.activeSessionsDesc': 'จัดการเซสชันที่ใช้งานอยู่ของคุณ',
    'profile.view': 'ดู',
    'profile.dangerZone': 'โซนอันตราย',
    'profile.deleteAccount': 'ลบบัญชี',
    'profile.deleteAccountDesc': 'ลบบัญชีและข้อมูลที่เกี่ยวข้องทั้งหมดอย่างถาวร',
    
    // Language
    'language.english': 'English',
    'language.thai': 'ไทย'
  }
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en');

  useEffect(() => {
    // Load saved language from localStorage
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'th')) {
      setLanguageState(savedLanguage);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  const value = {
    language,
    setLanguage,
    t
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}