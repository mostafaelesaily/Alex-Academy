import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
  Navigate,
} from "react-router-dom";
import Logo from "./Images/Logo.png";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faGraduationCap,
  faWheelchair,
  faSignInAlt,
  faSignOutAlt,
  faGlobe,
  faEdit,
  faTrash,
  faPlus,
  faHome,
  faUserAlt,
  faFemale,
} from "@fortawesome/free-solid-svg-icons";
import "./Styles/main.css";
import "./Styles/welcome.css";
import "./Styles/admin.css";

// Helper functions for localStorage
const saveToLocalStorage = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error("Error saving to localStorage:", error);
  }
};

const loadFromLocalStorage = (key, defaultValue) => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : defaultValue;
  } catch (error) {
    console.error("Error loading from localStorage:", error);
    return defaultValue;
  }
};

const AlexApp = () => {
  const [language, setLanguage] = useState(
    loadFromLocalStorage("khatwa_language", "ar")
  );
  const [isLoggedIn, setIsLoggedIn] = useState(
    loadFromLocalStorage("khatwa_isLoggedIn", false)
  );
  const [isAdmin, setIsAdmin] = useState(
    loadFromLocalStorage("khatwa_isAdmin", false)
  );
  const [currentUser, setCurrentUser] = useState(
    loadFromLocalStorage("khatwa_currentUser", null)
  );
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [registerUsername, setRegisterUsername] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerConfirmPassword, setRegisterConfirmPassword] = useState("");
  const [users, setUsers] = useState(
    loadFromLocalStorage("khatwa_users", [
      { username: "user1", password: "pass123" },
      { username: "user2", password: "pass456" },
    ])
  );

  const [welcomeText, setWelcomeText] = useState(
    loadFromLocalStorage("khatwa_welcomeText", {
      ar: 'تطبيق "خطوة" يهدف إلى رفع الوعي المجتمعي لفئات أصحاب الهمم، الإناث، والطلاب من خلال محتوى تفاعلي وتعليمي بسيط.',
      en: 'The "Step" app aims to raise community awareness for people of determination, females, and students through interactive and simple educational content.',
    })
  );

  const [categories, setCategories] = useState(
    loadFromLocalStorage("khatwa_categories", {
      peopleOfDetermination: {
        ar: {
          title: "أصحاب الهمم",
          content:
            "هنا ستجد معلومات توعوية مهمة لأصحاب الهمم وحقوقهم وكيفية دمجهم في المجتمع.",
          media: [],
          quiz: [
            {
              question: "ما هي حقوق أصحاب الهمم في المجتمع؟",
              options: [
                "الحق في التعليم والعمل",
                "الحق في الرعاية الصحية",
                "الحق في المشاركة المجتمعية",
                "جميع ما سبق",
              ],
              correctAnswer: 3,
            },
            {
              question: "ما هي نسبة أصحاب الهمم في المجتمع تقريبًا؟",
              options: ["5%", "10%", "15%", "20%"],
              correctAnswer: 2,
            },
            {
              question: "ما هو اليوم العالمي لأصحاب الهمم؟",
              options: ["3 ديسمبر", "5 يناير", "10 مارس", "15 أبريل"],
              correctAnswer: 0,
            },
            {
              question: "ما هي أبرز التحديات التي يواجهها أصحاب الهمم؟",
              options: [
                "التهميش الاجتماعي",
                "صعوبة الوصول للمرافق",
                "قلة فرص العمل",
                "جميع ما سبق",
              ],
              correctAnswer: 3,
            },
            {
              question: "ما هي أفضل طريقة لدعم أصحاب الهمم؟",
              options: [
                "التعاطف معهم",
                "توفير فرص عمل مناسبة",
                "التعامل معهم كأفراد عاديين",
                "ب و ج معًا",
              ],
              correctAnswer: 3,
            },
            {
              question: "ما هو الهدف من التوعية بأصحاب الهمم؟",
              options: [
                "زيادة التعاطف معهم",
                "تحسين دمجهم في المجتمع",
                "زيادة التبرعات لهم",
                "جميع ما سبق",
              ],
              correctAnswer: 1,
            },
            {
              question: "ما هي أبرز الإعاقات التي يعاني منها أصحاب الهمم؟",
              options: [
                "الإعاقة الحركية",
                "الإعاقة البصرية",
                "الإعاقة السمعية",
                "جميع ما سبق",
              ],
              correctAnswer: 3,
            },
            {
              question: "ما هي أبرز المنظمات الداعمة لأصحاب الهمم؟",
              options: [
                "الأمم المتحدة",
                "اليونيسيف",
                "منظمة الصحة العالمية",
                "جميع ما سبق",
              ],
              correctAnswer: 3,
            },
            {
              question: "ما هو دور المجتمع في دعم أصحاب الهمم؟",
              options: [
                "توفير المرافق المناسبة",
                "القبول والدمج",
                "توفير فرص التعليم",
                "جميع ما سبق",
              ],
              correctAnswer: 3,
            },
            {
              question: "ما هي أبرز التقنيات المساعدة لأصحاب الهمم؟",
              options: [
                "الكرسي المتحرك",
                "العكاز",
                "سماعات الأذن",
                "جميع ما سبق",
              ],
              correctAnswer: 3,
            },
          ],
        },
        en: {
          title: "People of Determination",
          content:
            "Here you will find important awareness information for people of determination, their rights and how to integrate them into society.",
          media: [],
          quiz: [
            {
              question:
                "What are the rights of people of determination in society?",
              options: [
                "Right to education and work",
                "Right to healthcare",
                "Right to community participation",
                "All of the above",
              ],
              correctAnswer: 3,
            },
            {
              question:
                "What is the approximate percentage of people of determination in society?",
              options: ["5%", "10%", "15%", "20%"],
              correctAnswer: 2,
            },
            {
              question:
                "What is the International Day of People of Determination?",
              options: ["December 3", "January 5", "March 10", "April 15"],
              correctAnswer: 0,
            },
            {
              question:
                "What are the main challenges faced by people of determination?",
              options: [
                "Social marginalization",
                "Difficulty accessing facilities",
                "Lack of job opportunities",
                "All of the above",
              ],
              correctAnswer: 3,
            },
            {
              question:
                "What is the best way to support people of determination?",
              options: [
                "Sympathize with them",
                "Provide suitable job opportunities",
                "Treat them as normal individuals",
                "B and C together",
              ],
              correctAnswer: 3,
            },
            {
              question:
                "What is the goal of awareness about people of determination?",
              options: [
                "Increase sympathy for them",
                "Improve their integration into society",
                "Increase donations for them",
                "All of the above",
              ],
              correctAnswer: 1,
            },
            {
              question:
                "What are the main disabilities of people of determination?",
              options: [
                "Mobility disability",
                "Visual disability",
                "Hearing disability",
                "All of the above",
              ],
              correctAnswer: 3,
            },
            {
              question:
                "What are the main organizations supporting people of determination?",
              options: [
                "United Nations",
                "UNICEF",
                "World Health Organization",
                "All of the above",
              ],
              correctAnswer: 3,
            },
            {
              question:
                "What is the role of society in supporting people of determination?",
              options: [
                "Provide appropriate facilities",
                "Acceptance and integration",
                "Provide education opportunities",
                "All of the above",
              ],
              correctAnswer: 3,
            },
            {
              question:
                "What are the main assistive technologies for people of determination?",
              options: [
                "Wheelchair",
                "Crutch",
                "Hearing aids",
                "All of the above",
              ],
              correctAnswer: 3,
            },
          ],
        },
      },
      females: {
        ar: {
          title: "السيدات",
          content:
            "هنا ستجد معلومات توعوية مهمة للسيدات حول الصحة والحقوق والتمكين في المجتمع.",
          media: [],
          quiz: [
            {
              question: "ما هي حقوق المرأة في المجتمع؟",
              options: [
                "الحق في التعليم",
                "الحق في العمل",
                "الحق في المشاركة السياسية",
                "جميع ما سبق",
              ],
              correctAnswer: 3,
            },
            {
              question: "ما هي نسبة النساء في العالم تقريبًا؟",
              options: ["40%", "49%", "51%", "55%"],
              correctAnswer: 2,
            },
            {
              question: "ما هو اليوم العالمي للمرأة؟",
              options: ["8 مارس", "5 يونيو", "10 ديسمبر", "15 يناير"],
              correctAnswer: 0,
            },
            {
              question: "ما هي أبرز التحديات التي تواجهها المرأة؟",
              options: [
                "التفرقة الجندرية",
                "العنف الأسري",
                "قلة الفرص الوظيفية",
                "جميع ما سبق",
              ],
              correctAnswer: 3,
            },
            {
              question: "ما هي أفضل طريقة لتمكين المرأة؟",
              options: [
                "التعليم",
                "التوعية بحقوقها",
                "توفير فرص العمل",
                "جميع ما سبق",
              ],
              correctAnswer: 3,
            },
            {
              question: "ما هو الهدف من التوعية بحقوق المرأة؟",
              options: [
                "تحسين وضعها الاجتماعي",
                "زيادة مشاركتها في سوق العمل",
                "حمايتها من العنف",
                "جميع ما سبق",
              ],
              correctAnswer: 3,
            },
            {
              question: "ما هي أبرز الأمراض التي تصيب النساء؟",
              options: [
                "سرطان الثدي",
                "هشاشة العظام",
                "أمراض القلب",
                "جميع ما سبق",
              ],
              correctAnswer: 3,
            },
            {
              question: "ما هي أبرز المنظمات الداعمة للمرأة؟",
              options: [
                "هيئة الأمم المتحدة للمرأة",
                "اليونيسيف",
                "منظمة الصحة العالمية",
                "جميع ما سبق",
              ],
              correctAnswer: 0,
            },
            {
              question: "ما هو دور المجتمع في دعم المرأة؟",
              options: [
                "توفير التعليم الجيد",
                "القضاء على التفرقة",
                "توفير الحماية القانونية",
                "جميع ما سبق",
              ],
              correctAnswer: 3,
            },
            {
              question: "ما هي أبرز إنجازات المرأة في العصر الحديث؟",
              options: [
                "الوصول لمراكز قيادية",
                "إثبات كفاءتها في مختلف المجالات",
                "المساهمة في التنمية المجتمعية",
                "جميع ما سبق",
              ],
              correctAnswer: 3,
            },
          ],
        },
        en: {
          title: "Ladies",
          content:
            "Here you will find important awareness information for ladies about health, rights and empowerment in society.",
          media: [],
          quiz: [
            {
              question: "What are women's rights in society?",
              options: [
                "Right to education",
                "Right to work",
                "Right to political participation",
                "All of the above",
              ],
              correctAnswer: 3,
            },
            {
              question:
                "What is the approximate percentage of women in the world?",
              options: ["40%", "49%", "51%", "55%"],
              correctAnswer: 2,
            },
            {
              question: "What is International Women's Day?",
              options: ["March 8", "June 5", "December 10", "January 15"],
              correctAnswer: 0,
            },
            {
              question: "What are the main challenges women face?",
              options: [
                "Gender discrimination",
                "Domestic violence",
                "Lack of job opportunities",
                "All of the above",
              ],
              correctAnswer: 3,
            },
            {
              question: "What is the best way to empower women?",
              options: [
                "Education",
                "Awareness of their rights",
                "Providing job opportunities",
                "All of the above",
              ],
              correctAnswer: 3,
            },
            {
              question: "What is the goal of awareness about women's rights?",
              options: [
                "Improve her social status",
                "Increase her participation in the labor market",
                "Protect her from violence",
                "All of the above",
              ],
              correctAnswer: 3,
            },
            {
              question: "What are the most common diseases that affect women?",
              options: [
                "Breast cancer",
                "Osteoporosis",
                "Heart disease",
                "All of the above",
              ],
              correctAnswer: 3,
            },
            {
              question: "What are the main organizations supporting women?",
              options: [
                "UN Women",
                "UNICEF",
                "World Health Organization",
                "All of the above",
              ],
              correctAnswer: 0,
            },
            {
              question: "What is the role of society in supporting women?",
              options: [
                "Provide good education",
                "Eliminate discrimination",
                "Provide legal protection",
                "All of the above",
              ],
              correctAnswer: 3,
            },
            {
              question:
                "What are the most prominent achievements of women in modern times?",
              options: [
                "Reaching leadership positions",
                "Proving her competence in various fields",
                "Contributing to community development",
                "All of the above",
              ],
              correctAnswer: 3,
            },
          ],
        },
      },
      students: {
        ar: {
          title: "طلاب",
          content:
            "هنا ستجد معلومات توعوية مهمة للطلاب حول حقوقهم وكيفية حمايتهم من المخاطر.",
          media: [],
          quiz: [
            {
              question: "ما هي حقوق الطلاب في المدرسة؟",
              options: [
                "الحق في التعليم الجيد",
                "الحق في بيئة آمنة",
                "الحق في التعبير عن الرأي",
                "جميع ما سبق",
              ],
              correctAnswer: 3,
            },
            {
              question: "ما هي نسبة الطلاب في المجتمع تقريبًا؟",
              options: ["15%", "25%", "35%", "45%"],
              correctAnswer: 1,
            },
            {
              question: "ما هو اليوم العالمي للطلاب؟",
              options: ["17 نوفمبر", "5 يناير", "10 مارس", "15 أبريل"],
              correctAnswer: 0,
            },
            {
              question: "ما هي أبرز التحديات التي يواجهها الطلاب؟",
              options: [
                "الضغط الدراسي",
                "التنمر",
                "صعوبة التأقلم",
                "جميع ما سبق",
              ],
              correctAnswer: 3,
            },
            {
              question: "ما هي أفضل طريقة لدعم الطلاب؟",
              options: [
                "توفير بيئة تعليمية جيدة",
                "التوعية بحقوقهم",
                "توفير الدعم النفسي",
                "جميع ما سبق",
              ],
              correctAnswer: 3,
            },
            {
              question: "ما هو الهدف من التوعية بحقوق الطلاب؟",
              options: [
                "تحسين تجربتهم التعليمية",
                "حمايتهم من المخاطر",
                "زيادة مشاركتهم",
                "جميع ما سبق",
              ],
              correctAnswer: 3,
            },
            {
              question: "ما هي أبرز المشاكل الصحية التي تصيب الطلاب؟",
              options: [
                "قصر النظر",
                "آلام الظهر",
                "الإجهاد والتوتر",
                "جميع ما سبق",
              ],
              correctAnswer: 3,
            },
            {
              question: "ما هي أبرز المنظمات الداعمة للطلاب؟",
              options: [
                "اليونيسيف",
                "اليونسكو",
                "منظمة الصحة العالمية",
                "جميع ما سبق",
              ],
              correctAnswer: 3,
            },
            {
              question: "ما هو دور المجتمع في دعم الطلاب؟",
              options: [
                "توفير التعليم الجيد",
                "توفير الأنشطة اللاصفية",
                "توفير الدعم النفسي",
                "جميع ما سبق",
              ],
              correctAnswer: 3,
            },
            {
              question: "ما هي أبرز المهارات التي يحتاجها الطلاب؟",
              options: [
                "مهارات الدراسة",
                "مهارات التواصل",
                "مهارات حل المشكلات",
                "جميع ما سبق",
              ],
              correctAnswer: 3,
            },
          ],
        },
        en: {
          title: "Students",
          content:
            "Here you will find important awareness information for students about their rights and how to protect them from dangers.",
          media: [],
          quiz: [
            {
              question: "What are students' rights at school?",
              options: [
                "Right to good education",
                "Right to a safe environment",
                "Right to express opinion",
                "All of the above",
              ],
              correctAnswer: 3,
            },
            {
              question:
                "What is the approximate percentage of students in society?",
              options: ["15%", "25%", "35%", "45%"],
              correctAnswer: 1,
            },
            {
              question: "What is International Students' Day?",
              options: ["November 17", "January 5", "March 10", "April 15"],
              correctAnswer: 0,
            },
            {
              question: "What are the main challenges students face?",
              options: [
                "Academic pressure",
                "Bullying",
                "Difficulty adapting",
                "All of the above",
              ],
              correctAnswer: 3,
            },
            {
              question: "What is the best way to support students?",
              options: [
                "Provide a good learning environment",
                "Awareness of their rights",
                "Provide psychological support",
                "All of the above",
              ],
              correctAnswer: 3,
            },
            {
              question: "What is the goal of awareness about students' rights?",
              options: [
                "Improve their learning experience",
                "Protect them from risks",
                "Increase their participation",
                "All of the above",
              ],
              correctAnswer: 3,
            },
            {
              question:
                "What are the most common health problems among students?",
              options: [
                "Myopia",
                "Back pain",
                "Stress and anxiety",
                "All of the above",
              ],
              correctAnswer: 3,
            },
            {
              question: "What are the main organizations supporting students?",
              options: [
                "UNICEF",
                "UNESCO",
                "World Health Organization",
                "All of the above",
              ],
              correctAnswer: 3,
            },
            {
              question: "What is the role of society in supporting students?",
              options: [
                "Provide good education",
                "Provide extracurricular activities",
                "Provide psychological support",
                "All of the above",
              ],
              correctAnswer: 3,
            },
            {
              question: "What are the most important skills students need?",
              options: [
                "Study skills",
                "Communication skills",
                "Problem-solving skills",
                "All of the above",
              ],
              correctAnswer: 3,
            },
          ],
        },
      },
    })
  );

  useEffect(() => {
    saveToLocalStorage("khatwa_language", language);
  }, [language]);

  useEffect(() => {
    saveToLocalStorage("khatwa_isLoggedIn", isLoggedIn);
    saveToLocalStorage("khatwa_isAdmin", isAdmin);
    saveToLocalStorage("khatwa_currentUser", currentUser);
  }, [isLoggedIn, isAdmin, currentUser]);

  useEffect(() => {
    saveToLocalStorage("khatwa_welcomeText", welcomeText);
  }, [welcomeText]);

  useEffect(() => {
    saveToLocalStorage("khatwa_categories", categories);
  }, [categories]);

  useEffect(() => {
    saveToLocalStorage("khatwa_users", users);
  }, [users]);

  const adminAccounts = [
    { username: "admin1", password: "admin123" },
    { username: "admin2", password: "admin456" },
  ];

  const handleLogin = (e) => {
    e.preventDefault();
    const foundAdmin = adminAccounts.find(
      (acc) => acc.username === username && acc.password === password
    );

    const foundUser = users.find(
      (user) => user.username === username && user.password === password
    );

    if (foundAdmin) {
      setIsAdmin(true);
      setIsLoggedIn(true);
      setCurrentUser(username);
      setShowLoginModal(false);
      saveToLocalStorage("khatwa_isAdmin", true);
      saveToLocalStorage("khatwa_isLoggedIn", true);
      saveToLocalStorage("khatwa_currentUser", username);
    } else if (foundUser) {
      setIsLoggedIn(true);
      setCurrentUser(username);
      setShowLoginModal(false);
      saveToLocalStorage("khatwa_isLoggedIn", true);
      saveToLocalStorage("khatwa_currentUser", username);
    } else {
      alert(
        language === "ar" ? "بيانات الدخول غير صحيحة" : "Invalid credentials"
      );
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (registerPassword !== registerConfirmPassword) {
      alert(
        language === "ar" ? "كلمة المرور غير متطابقة" : "Passwords don't match"
      );
      return;
    }

    if (users.some((user) => user.username === registerUsername)) {
      alert(
        language === "ar"
          ? "اسم المستخدم موجود بالفعل"
          : "Username already exists"
      );
      return;
    }

    const newUser = {
      username: registerUsername,
      password: registerPassword,
    };

    setUsers([...users, newUser]);
    setShowRegisterModal(false);
    setRegisterUsername("");
    setRegisterPassword("");
    setRegisterConfirmPassword("");
    alert(
      language === "ar"
        ? "تم إنشاء الحساب بنجاح"
        : "Account created successfully"
    );
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsAdmin(false);
    setCurrentUser(null);
    saveToLocalStorage("khatwa_isLoggedIn", false);
    saveToLocalStorage("khatwa_isAdmin", false);
    saveToLocalStorage("khatwa_currentUser", null);
  };

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "ar" ? "en" : "ar"));
  };

  const updateWelcomeText = (newText) => {
    const updated = {
      ...welcomeText,
      [language]: newText,
    };
    setWelcomeText(updated);
    saveToLocalStorage("khatwa_welcomeText", updated);
  };

  const updateCategoryContent = (category, newContent) => {
    const updated = {
      ...categories,
      [category]: {
        ...categories[category],
        [language]: {
          ...categories[category][language],
          content: newContent,
        },
      },
    };
    setCategories(updated);
    saveToLocalStorage("khatwa_categories", updated);
  };

  const addMediaToCategory = (category, media) => {
    const updated = {
      ...categories,
      [category]: {
        ...categories[category],
        [language]: {
          ...categories[category][language],
          media: [...categories[category][language].media, media],
        },
      },
    };
    setCategories(updated);
    saveToLocalStorage("khatwa_categories", updated);
  };

  const removeMediaFromCategory = (category, index) => {
    const updated = {
      ...categories,
      [category]: {
        ...categories[category],
        [language]: {
          ...categories[category][language],
          media: categories[category][language].media.filter(
            (_, i) => i !== index
          ),
        },
      },
    };
    setCategories(updated);
    saveToLocalStorage("khatwa_categories", updated);
  };

  const addQuizQuestion = (category, question) => {
    const updated = {
      ...categories,
      [category]: {
        ...categories[category],
        [language]: {
          ...categories[category][language],
          quiz: [...categories[category][language].quiz, question],
        },
      },
    };
    setCategories(updated);
    saveToLocalStorage("khatwa_categories", updated);
  };

  const removeQuizQuestion = (category, index) => {
    const updated = {
      ...categories,
      [category]: {
        ...categories[category],
        [language]: {
          ...categories[category][language],
          quiz: categories[category][language].quiz.filter(
            (_, i) => i !== index
          ),
        },
      },
    };
    setCategories(updated);
    saveToLocalStorage("khatwa_categories", updated);
  };

  return (
    <Router>
      <div className={`app-container ${language === "ar" ? "rtl" : "ltr"}`}>
        <nav className="navbar navbar-expand-lg navbar-dark bg-warning fixed-top shadow-sm">
          <div className="container py-2">
            <Link className="navbar-brand d-flex align-items-center" to="/">
              <span className="app-name me-2 fw-bold">
                {language === "ar" ? "Alex Academy" : "Step"}
              </span>
              <img
                src={Logo}
                alt="App Logo"
                className="app-logo rounded-circle"
                style={{ width: "40px", height: "40px" }}
              />
            </Link>

            <div className="d-flex align-items-center">
              <button
                className="btn btn-outline-light me-2 btn-sm"
                onClick={toggleLanguage}
              >
                <FontAwesomeIcon icon={faGlobe} className="me-1" />
                {language === "ar" ? "English" : "العربية"}
              </button>

              {isLoggedIn ? (
                <>
                  {isAdmin && (
                    <span className="badge bg-danger me-2">
                      {language === "ar" ? "مسؤول" : "Admin"}
                    </span>
                  )}
                  <button
                    className="btn btn-outline-light btn-sm"
                    onClick={handleLogout}
                  >
                    <FontAwesomeIcon icon={faSignOutAlt} className="me-1" />
                    {language === "ar" ? "تسجيل خروج" : "Logout"}
                  </button>
                </>
              ) : (
                <>
                  <button
                    className="btn btn-outline-light btn-sm me-2"
                    onClick={() => setShowRegisterModal(true)}
                  >
                    <FontAwesomeIcon icon={faUser} className="me-1" />
                    {language === "ar" ? "إنشاء حساب" : "Register"}
                  </button>
                  <button
                    className="btn btn-outline-light btn-sm"
                    onClick={() => setShowLoginModal(true)}
                  >
                    <FontAwesomeIcon icon={faSignInAlt} className="me-1" />
                    {language === "ar" ? "تسجيل دخول" : "Login"}
                  </button>
                </>
              )}
            </div>
          </div>
        </nav>

        <main
          className="main-content"
          style={{ paddingTop: "80px", paddingBottom: "80px" }}
        >
          <Routes>
            <Route
              path="/"
              element={
                <WelcomePage
                  language={language}
                  welcomeText={welcomeText[language]}
                  isAdmin={isAdmin}
                  updateWelcomeText={updateWelcomeText}
                />
              }
            />

            <Route
              path="/people-of-determination"
              element={
                <CategoryPage
                  category="peopleOfDetermination"
                  data={categories.peopleOfDetermination[language]}
                  isAdmin={isAdmin}
                  updateContent={updateCategoryContent}
                  addMedia={addMediaToCategory}
                  removeMedia={removeMediaFromCategory}
                  addQuiz={addQuizQuestion}
                  removeQuiz={removeQuizQuestion}
                  language={language}
                />
              }
            />

            <Route
              path="/females"
              element={
                <CategoryPage
                  category="females"
                  data={categories.females[language]}
                  isAdmin={isAdmin}
                  updateContent={updateCategoryContent}
                  addMedia={addMediaToCategory}
                  removeMedia={removeMediaFromCategory}
                  addQuiz={addQuizQuestion}
                  removeQuiz={removeQuizQuestion}
                  language={language}
                />
              }
            />

            <Route
              path="/students"
              element={
                <CategoryPage
                  category="students"
                  data={categories.students[language]}
                  isAdmin={isAdmin}
                  updateContent={updateCategoryContent}
                  addMedia={addMediaToCategory}
                  removeMedia={removeMediaFromCategory}
                  addQuiz={addQuizQuestion}
                  removeQuiz={removeQuizQuestion}
                  language={language}
                />
              }
            />

            {/* Add a catch-all route for unknown paths */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        <footer className="footer bg-warning text-dark py-3 mt-auto shadow-sm">
          <div className="container">
            <div className="row">
              <div className="col-md-4 mb-3 mb-md-0">
                <h5 className="fw-bold">
                  {language === "ar" ? "عن التطبيق" : "About the App"}
                </h5>
                <p className="mb-0">
                  {language === "ar"
                    ? "تطبيق Alex Academy يهدف إلى رفع الوعي المجتمعي لفئات خاصة في المجتمع."
                    : "Step app aims to raise community awareness for special groups in society."}
                </p>
              </div>
              <div className="col-md-4 mb-3 mb-md-0">
                <h5 className="fw-bold">
                  {language === "ar" ? "روابط سريعة" : "Quick Links"}
                </h5>
                <ul className="list-unstyled">
                  <li className="mb-2">
                    <Link
                      to="/"
                      className="text-dark text-decoration-none hover-effect"
                    >
                      <FontAwesomeIcon icon={faHome} className="me-2" />
                      {language === "ar" ? "الرئيسية" : "Home"}
                    </Link>
                  </li>
                  <li className="mb-2">
                    <Link
                      to="/people-of-determination"
                      className="text-dark text-decoration-none hover-effect"
                    >
                      <FontAwesomeIcon icon={faWheelchair} className="me-2" />
                      {language === "ar" ? "أصحاب الهمم" : "POD"}
                    </Link>
                  </li>
                  <li className="mb-2">
                    <Link
                      to="/students"
                      className="text-dark text-decoration-none hover-effect"
                    >
                      <FontAwesomeIcon
                        icon={faGraduationCap}
                        className="me-2"
                      />
                      {language === "ar" ? "الطلاب" : "Students"}
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="col-md-4">
                <div className="text-center text-md-start">
                  <img
                    src={Logo}
                    alt="Stay Bank"
                    className="mb-2 rounded-circle"
                    style={{ width: "50px", height: "50px" }}
                  />
                  <h5 className="fw-bold">
                    {language === "ar" ? "بقوا بنك" : "Stay Bank"}
                  </h5>
                  <p className="mb-0">
                    {language === "ar" ? "البريد الإلكتروني:" : "Email:"}{" "}
                    info@khatwa.com
                  </p>
                </div>
              </div>
            </div>
            <hr className="my-2" />
            <div className="text-center">
              <p className="mb-0 small">
                &copy; {new Date().getFullYear()}{" "}
                {language === "ar" ? "تطبيق خطوة" : "Khatwa App"}.{" "}
                {language === "ar" ? "كل الحقوق محفوظة" : "All rights reserved"}
              </p>
            </div>
          </div>
        </footer>

        {showLoginModal && (
          <div className="modal-overlay d-flex align-items-center justify-content-center">
            <div className="modal-content bg-white p-4 rounded shadow-lg animate__animated animate__fadeIn">
              <div className="modal-header border-0 pb-0">
                <h3 className="modal-title">
                  {language === "ar" ? "تسجيل الدخول" : "Login"}
                </h3>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowLoginModal(false)}
                ></button>
              </div>
              <form onSubmit={handleLogin} className="modal-body">
                <div className="mb-3">
                  <label className="form-label">
                    {language === "ar" ? "اسم المستخدم" : "Username"}
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">
                    {language === "ar" ? "كلمة المرور" : "Password"}
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="d-grid gap-2">
                  <button
                    type="submit"
                    className="btn btn-warning text-white hover-effect"
                  >
                    {language === "ar" ? "دخول" : "Login"}
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-secondary hover-effect"
                    onClick={() => setShowLoginModal(false)}
                  >
                    {language === "ar" ? "إلغاء" : "Cancel"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {showRegisterModal && (
          <div className="modal-overlay d-flex align-items-center justify-content-center">
            <div className="modal-content bg-white p-4 rounded shadow-lg animate__animated animate__fadeIn">
              <div className="modal-header border-0 pb-0">
                <h3 className="modal-title">
                  {language === "ar" ? "إنشاء حساب" : "Register"}
                </h3>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowRegisterModal(false)}
                ></button>
              </div>
              <form onSubmit={handleRegister} className="modal-body">
                <div className="mb-3">
                  <label className="form-label">
                    {language === "ar" ? "اسم المستخدم" : "Username"}
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={registerUsername}
                    onChange={(e) => setRegisterUsername(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">
                    {language === "ar" ? "كلمة المرور" : "Password"}
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    value={registerPassword}
                    onChange={(e) => setRegisterPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">
                    {language === "ar"
                      ? "تأكيد كلمة المرور"
                      : "Confirm Password"}
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    value={registerConfirmPassword}
                    onChange={(e) => setRegisterConfirmPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="d-grid gap-2">
                  <button
                    type="submit"
                    className="btn btn-warning text-white hover-effect"
                  >
                    {language === "ar" ? "إنشاء حساب" : "Register"}
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-secondary hover-effect"
                    onClick={() => setShowRegisterModal(false)}
                  >
                    {language === "ar" ? "إلغاء" : "Cancel"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </Router>
  );
};

const WelcomePage = ({ language, welcomeText, isAdmin, updateWelcomeText }) => {
  const [editing, setEditing] = useState(false);
  const [tempText, setTempText] = useState(welcomeText);

  const handleSave = () => {
    updateWelcomeText(tempText);
    setEditing(false);
  };

  return (
    <div className="welcome-page container py-5">
      <div className="welcome-content bg-light p-4 rounded shadow-sm animate__animated animate__fadeIn">
        {isAdmin && !editing ? (
          <div className="text-end mb-3">
            <button
              className="btn btn-sm btn-outline-warning hover-effect"
              onClick={() => setEditing(true)}
            >
              <FontAwesomeIcon icon={faEdit} className="me-1" />
              {language === "ar" ? "تعديل" : "Edit"}
            </button>
          </div>
        ) : null}

        {editing ? (
          <div className="edit-section mb-4">
            <textarea
              className="form-control mb-2"
              value={tempText}
              onChange={(e) => setTempText(e.target.value)}
              rows="4"
            />
            <div className="d-flex justify-content-end gap-2">
              <button
                className="btn btn-sm btn-warning text-white hover-effect"
                onClick={handleSave}
              >
                {language === "ar" ? "حفظ" : "Save"}
              </button>
              <button
                className="btn btn-sm btn-outline-secondary hover-effect"
                onClick={() => {
                  setTempText(welcomeText);
                  setEditing(false);
                }}
              >
                {language === "ar" ? "إلغاء" : "Cancel"}
              </button>
            </div>
          </div>
        ) : (
          <p className="welcome-text lead text-center mb-5">{welcomeText}</p>
        )}

        <div className="row g-4">
          <div className="col-md-4">
            <Link
              to="/people-of-determination"
              className="category-card card h-100 text-decoration-none hover-scale"
            >
              <div className="card-body text-center py-4">
                <div className="icon-container mb-3">
                  <FontAwesomeIcon
                    icon={faWheelchair}
                    size="3x"
                    className="text-warning"
                  />
                </div>
                <h3 className="card-title fw-bold">
                  {language === "ar"
                    ? "أصحاب الهمم"
                    : "People of Determination"}
                </h3>
              </div>
            </Link>
          </div>

          <div className="col-md-4">
            <Link
              to="/females"
              className="category-card card h-100 text-decoration-none hover-scale"
            >
              <div className="card-body text-center py-4">
                <div className="icon-container mb-3">
                  <FontAwesomeIcon
                    icon={faFemale}
                    size="3x"
                    className="text-warning"
                  />
                </div>
                <h3 className="card-title fw-bold">
                  {language === "ar" ? "السيدات" : "Ladies"}
                </h3>
              </div>
            </Link>
          </div>

          <div className="col-md-4">
            <Link
              to="/students"
              className="category-card card h-100 text-decoration-none hover-scale"
            >
              <div className="card-body text-center py-4">
                <div className="icon-container mb-3">
                  <FontAwesomeIcon
                    icon={faGraduationCap}
                    size="3x"
                    className="text-warning"
                  />
                </div>
                <h3 className="card-title fw-bold">
                  {language === "ar" ? "الطلاب" : "Students"}
                </h3>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

const CategoryPage = ({
  category,
  data,
  isAdmin,
  updateContent,
  addMedia,
  removeMedia,
  addQuiz,
  removeQuiz,
  language,
}) => {
  const [editing, setEditing] = useState(false);
  const [tempContent, setTempContent] = useState(data.content);
  const [newMediaUrl, setNewMediaUrl] = useState("");
  const [newMediaType, setNewMediaType] = useState("image");
  const [newQuestion, setNewQuestion] = useState({
    question: "",
    options: ["", "", "", ""],
    correctAnswer: 0,
  });
  const [mediaFile, setMediaFile] = useState(null);
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [score, setScore] = useState(0);

  const handleSaveContent = () => {
    updateContent(category, tempContent);
    setEditing(false);
  };

  const handleAddMedia = () => {
    if (mediaFile) {
      const fileUrl = URL.createObjectURL(mediaFile);
      addMedia(category, { type: newMediaType, url: fileUrl });
      setMediaFile(null);
      setNewMediaUrl("");
    } else if (newMediaUrl) {
      addMedia(category, { type: newMediaType, url: newMediaUrl });
      setNewMediaUrl("");
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setMediaFile(file);
      setNewMediaType(file.type.startsWith("image") ? "image" : "video");
    }
  };

  const handleAddQuestion = () => {
    if (
      newQuestion.question &&
      newQuestion.options.every((opt) => opt.trim() !== "")
    ) {
      addQuiz(category, { ...newQuestion });
      setNewQuestion({
        question: "",
        options: ["", "", "", ""],
        correctAnswer: 0,
      });
    }
  };

  const startQuiz = () => {
    setQuizStarted(true);
    setCurrentQuestionIndex(0);
    setSelectedAnswers([]);
    setQuizCompleted(false);
    setScore(0);
  };

  const handleAnswerSelect = (answerIndex) => {
    const newSelectedAnswers = [...selectedAnswers];
    newSelectedAnswers[currentQuestionIndex] = answerIndex;
    setSelectedAnswers(newSelectedAnswers);
  };

  const goToNextQuestion = () => {
    if (currentQuestionIndex < data.quiz.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Calculate score when quiz is completed
      let correctAnswers = 0;
      data.quiz.forEach((question, index) => {
        if (selectedAnswers[index] === question.correctAnswer) {
          correctAnswers++;
        }
      });
      setScore(correctAnswers);
      setQuizCompleted(true);
    }
  };

  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const resetQuiz = () => {
    setQuizStarted(false);
    setQuizCompleted(false);
    setCurrentQuestionIndex(0);
    setSelectedAnswers([]);
    setScore(0);
  };

  return (
    <div className="category-page container py-5">
      <div className="category-content bg-light p-4 rounded shadow-sm animate__animated animate__fadeIn">
        <h2 className="text-center mb-4 fw-bold">{data.title}</h2>

        <div className="content-section mb-5">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h3 className="fw-bold">
              {language === "ar" ? "المحتوى" : "Content"}
            </h3>
            {isAdmin && !editing && (
              <button
                className="btn btn-sm btn-outline-warning hover-effect"
                onClick={() => setEditing(true)}
              >
                <FontAwesomeIcon icon={faEdit} className="me-1" />
                {language === "ar" ? "تعديل" : "Edit"}
              </button>
            )}
          </div>

          {editing ? (
            <div className="edit-section">
              <textarea
                className="form-control mb-3"
                value={tempContent}
                onChange={(e) => setTempContent(e.target.value)}
                rows="4"
              />
              <div className="d-flex justify-content-end gap-2">
                <button
                  className="btn btn-sm btn-warning text-white hover-effect"
                  onClick={handleSaveContent}
                >
                  {language === "ar" ? "حفظ" : "Save"}
                </button>
                <button
                  className="btn btn-sm btn-outline-secondary hover-effect"
                  onClick={() => {
                    setTempContent(data.content);
                    setEditing(false);
                  }}
                >
                  {language === "ar" ? "إلغاء" : "Cancel"}
                </button>
              </div>
            </div>
          ) : (
            <p className="category-text lead">{data.content}</p>
          )}
        </div>

        <div className="media-section mb-5">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h3 className="fw-bold">
              {language === "ar" ? "الوسائط" : "Media"}
            </h3>
          </div>

          {data.media.length > 0 ? (
            <div className="row g-3">
              {data.media.map((item, index) => (
                <div key={index} className="col-md-4 col-sm-6">
                  <div className="media-item card h-100 hover-scale">
                    <div className="card-body p-0">
                      {item.type === "image" ? (
                        <img
                          src={item.url}
                          alt={`Media ${index + 1}`}
                          className="img-fluid rounded-top"
                          style={{
                            height: "200px",
                            width: "100%",
                            objectFit: "cover",
                          }}
                        />
                      ) : (
                        <video
                          controls
                          className="w-100 rounded-top"
                          style={{ height: "200px", objectFit: "cover" }}
                        >
                          <source src={item.url} type="video/mp4" />
                        </video>
                      )}
                    </div>
                    {isAdmin && (
                      <div className="card-footer p-2">
                        <button
                          className="btn btn-sm btn-danger w-100 hover-effect"
                          onClick={() => removeMedia(category, index)}
                        >
                          <FontAwesomeIcon icon={faTrash} className="me-1" />
                          {language === "ar" ? "حذف" : "Delete"}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="alert alert-info">
              {language === "ar" ? "لا توجد وسائط متاحة" : "No media available"}
            </div>
          )}

          {isAdmin && (
            <div className="add-media-form mt-4 p-3 bg-white rounded border animate__animated animate__fadeIn">
              <h4 className="mb-3 fw-bold">
                {language === "ar" ? "إضافة وسائط جديدة" : "Add New Media"}
              </h4>
              <div className="mb-3">
                <label className="form-label">
                  {language === "ar" ? "نوع الوسائط" : "Media Type"}
                </label>
                <select
                  className="form-select"
                  value={newMediaType}
                  onChange={(e) => setNewMediaType(e.target.value)}
                >
                  <option value="image">
                    {language === "ar" ? "صورة" : "Image"}
                  </option>
                  <option value="video">
                    {language === "ar" ? "فيديو" : "Video"}
                  </option>
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label">
                  {language === "ar" ? "رفع ملف" : "Upload File"}
                </label>
                <input
                  type="file"
                  className="form-control"
                  accept={newMediaType === "image" ? "image/*" : "video/*"}
                  onChange={handleFileChange}
                />
                <div className="form-text">
                  {language === "ar" ? "أو" : "Or"}
                </div>
              </div>
              <div className="mb-3">
                <label className="form-label">
                  {language === "ar" ? "رابط الوسائط" : "Media URL"}
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder={language === "ar" ? "رابط الوسائط" : "Media URL"}
                  value={newMediaUrl}
                  onChange={(e) => setNewMediaUrl(e.target.value)}
                />
              </div>
              <button
                className="btn btn-warning text-white w-100 hover-effect"
                onClick={handleAddMedia}
                disabled={!mediaFile && !newMediaUrl}
              >
                <FontAwesomeIcon icon={faPlus} className="me-1" />
                {language === "ar" ? "إضافة وسائط" : "Add Media"}
              </button>
            </div>
          )}
        </div>

        <div className="quiz-section">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h3 className="fw-bold">
              {language === "ar" ? "اختبار قصير" : "Short Quiz"}
            </h3>
            {!isAdmin &&
              data.quiz.length > 0 &&
              !quizStarted &&
              !quizCompleted && (
                <button
                  className="btn btn-warning text-white hover-effect"
                  onClick={startQuiz}
                >
                  {language === "ar" ? "بدء الاختبار" : "Start Quiz"}
                </button>
              )}
          </div>

          {quizStarted && !quizCompleted && data.quiz.length > 0 && (
            <div className="quiz-container card p-4 mb-4">
              <div className="quiz-progress mb-3">
                <div className="progress">
                  <div
                    className="progress-bar bg-warning"
                    role="progressbar"
                    style={{
                      width: `${
                        ((currentQuestionIndex + 1) / data.quiz.length) * 100
                      }%`,
                    }}
                  ></div>
                </div>
                <div className="text-end mt-1">
                  <small>
                    {language === "ar"
                      ? `سؤال ${currentQuestionIndex + 1} من ${
                          data.quiz.length
                        }`
                      : `Question ${currentQuestionIndex + 1} of ${
                          data.quiz.length
                        }`}
                  </small>
                </div>
              </div>

              <div className="quiz-question mb-4">
                <h4 className="fw-bold">
                  {data.quiz[currentQuestionIndex].question}
                </h4>
                <div className="quiz-options mt-3">
                  {data.quiz[currentQuestionIndex].options.map(
                    (option, index) => (
                      <div
                        key={index}
                        className={`quiz-option p-3 mb-2 rounded ${
                          selectedAnswers[currentQuestionIndex] === index
                            ? "bg-warning text-white"
                            : "bg-light"
                        } hover-scale`}
                        onClick={() => handleAnswerSelect(index)}
                        style={{ cursor: "pointer" }}
                      >
                        {option}
                      </div>
                    )
                  )}
                </div>
              </div>

              <div className="quiz-navigation d-flex justify-content-between">
                <button
                  className="btn btn-outline-secondary hover-effect"
                  onClick={goToPreviousQuestion}
                  disabled={currentQuestionIndex === 0}
                >
                  {language === "ar" ? "السابق" : "Previous"}
                </button>
                <button
                  className="btn btn-warning text-white hover-effect"
                  onClick={goToNextQuestion}
                  disabled={selectedAnswers[currentQuestionIndex] === undefined}
                >
                  {currentQuestionIndex === data.quiz.length - 1
                    ? language === "ar"
                      ? "إنهاء الاختبار"
                      : "Finish Quiz"
                    : language === "ar"
                    ? "التالي"
                    : "Next"}
                </button>
              </div>
            </div>
          )}

          {quizCompleted && (
            <div className="quiz-result card p-4 mb-4 text-center">
              <h3 className="fw-bold mb-3">
                {language === "ar" ? "نتيجة الاختبار" : "Quiz Result"}
              </h3>
              <div className="score-display mb-4">
                <div
                  className="score-circle mx-auto d-flex align-items-center justify-content-center"
                  style={{
                    width: "150px",
                    height: "150px",
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, #ffc107, #fd7e14)",
                    color: "white",
                    fontSize: "2rem",
                    fontWeight: "bold",
                  }}
                >
                  {score}/{data.quiz.length}
                </div>
              </div>
              <p className="lead mb-4">
                {language === "ar"
                  ? `لقد أجبت بشكل صحيح على ${score} من أصل ${data.quiz.length} أسئلة`
                  : `You answered ${score} out of ${data.quiz.length} questions correctly`}
              </p>
              <button
                className="btn btn-warning text-white hover-effect"
                onClick={resetQuiz}
              >
                {language === "ar" ? "إعادة الاختبار" : "Retake Quiz"}
              </button>
            </div>
          )}

          {!quizStarted && !quizCompleted && data.quiz.length > 0 ? (
            <div className="quiz-questions">
              {data.quiz.map((q, qIndex) => (
                <div
                  key={qIndex}
                  className="quiz-question card mb-3 hover-scale"
                >
                  <div className="card-body">
                    <h5 className="card-title fw-bold">{q.question}</h5>
                    <ul className="list-group list-group-flush">
                      {q.options.map((opt, optIndex) => (
                        <li
                          key={optIndex}
                          className={`list-group-item ${
                            optIndex === q.correctAnswer
                              ? "list-group-item-success"
                              : ""
                          }`}
                        >
                          {opt}
                        </li>
                      ))}
                    </ul>
                  </div>
                  {isAdmin && (
                    <div className="card-footer p-2">
                      <button
                        className="btn btn-sm btn-danger w-100 hover-effect"
                        onClick={() => removeQuiz(category, qIndex)}
                      >
                        <FontAwesomeIcon icon={faTrash} className="me-1" />
                        {language === "ar" ? "حذف السؤال" : "Delete Question"}
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : null}

          {!quizStarted && !quizCompleted && data.quiz.length === 0 && (
            <div className="alert alert-info">
              {language === "ar"
                ? "لا توجد أسئلة متاحة"
                : "No questions available"}
            </div>
          )}

          {isAdmin && (
            <div className="add-quiz-form mt-4 p-3 bg-white rounded border animate__animated animate__fadeIn">
              <h4 className="mb-3 fw-bold">
                {language === "ar" ? "إضافة سؤال جديد" : "Add New Question"}
              </h4>
              <div className="mb-3">
                <label className="form-label">
                  {language === "ar" ? "السؤال" : "Question"}
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder={language === "ar" ? "السؤال" : "Question"}
                  value={newQuestion.question}
                  onChange={(e) =>
                    setNewQuestion({
                      ...newQuestion,
                      question: e.target.value,
                    })
                  }
                />
              </div>

              {newQuestion.options.map((opt, optIndex) => (
                <div key={optIndex} className="mb-3">
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder={`${language === "ar" ? "خيار" : "Option"} ${
                        optIndex + 1
                      }`}
                      value={opt}
                      onChange={(e) => {
                        const newOptions = [...newQuestion.options];
                        newOptions[optIndex] = e.target.value;
                        setNewQuestion({ ...newQuestion, options: newOptions });
                      }}
                    />
                    <div className="input-group-text">
                      <input
                        type="radio"
                        name="correctAnswer"
                        checked={newQuestion.correctAnswer === optIndex}
                        onChange={() =>
                          setNewQuestion({
                            ...newQuestion,
                            correctAnswer: optIndex,
                          })
                        }
                      />
                    </div>
                    <span className="input-group-text">
                      {language === "ar" ? "إجابة صحيحة" : "Correct"}
                    </span>
                  </div>
                </div>
              ))}

              <button
                className="btn btn-warning text-white w-100 hover-effect"
                onClick={handleAddQuestion}
                disabled={
                  !newQuestion.question ||
                  newQuestion.options.some((opt) => opt.trim() === "")
                }
              >
                <FontAwesomeIcon icon={faPlus} className="me-1" />
                {language === "ar" ? "إضافة سؤال" : "Add Question"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AlexApp;
