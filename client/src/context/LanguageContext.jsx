import { createContext, useContext, useEffect, useMemo, useState } from "react";

const LANGUAGE_KEY = "laptomania-lang";

const translations = {
  en: {
    nav: {
      brand: "Laptomania",
      bagLabel: "Bag",
      bagTitle: "Your Picks",
      emptyCart: "Your cart feels light. Add something powerful.",
      close: "Close",
      remove: "Remove",
      total: "Total",
      clearCart: "Clear cart",
      cart: "Cart",
      profile: "Profile",
      logout: "Logout",
      login: "Login",
      signup: "Sign Up",
      currentlyViewing: "Currently viewing",
      collection: "Collection",
      navLinks: {
        home: "Home",
        products: "Products",
      },
    },
    home: {
      hero: {
        tag: "Beyond ordinary laptops",
        title: "Precision crafted machines for modern creators.",
        subtitle:
          "Laptomania curates flagship laptops and limited custom builds that solve real workflow pain points. Every chassis is tuned, thermals validated, and delivered ready for intense daily use.",
        buttons: {
          primary: "explore drops",
          secondary: "view benchmark lab",
        },
        badges: ["Studio", "Developers", "Gamers", "Students", "Business"],
      },
      highlightStats: [
        { label: "Avg. Delivery", value: "48h" },
        { label: "Custom Builds", value: "+120" },
        { label: "Return Rate", value: "0.8%" },
      ],
      featureSection: {
        tag: "Curated Collections",
        title: "Pick a cadence that fits your workflow",
        cta: "View Catalog",
      },
      featureCards: [
        {
          title: "Creator Series",
          description:
            "Color-accurate panels, 64GB memory ceiling, and the newest Ryzen HX processors for 3D workflows.",
          badge: "New",
        },
        {
          title: "Travel Ultra",
          description:
            "Featherweight magnesium chassis with 20-hour real usage battery life and haptic touchpad.",
          badge: "Feather 1.3kg",
        },
        {
          title: "Esport Pro",
          description:
            "240Hz QHD miniLED, vapor chamber cooling, and hot-swappable mechanical keyboard deck.",
          badge: "Limited",
        },
      ],
      cardCta: "Deep dive",
      cardStatus: "Drop ready",
      studio: {
        tag: "Studio Program",
        title: "Designed with engineers, tuned with filmmakers.",
        text:
          "Every build cycle partners with a different creative studio to prototype unusual form factors. This season we explored detachable trackpads, carbon fiber palm rests, and modular IO rails.",
        experimentLabel: "Experiment",
        experimentValue: "VaporFrame 003",
        surfaceLabel: "Surface treatment",
        surfaceValue: "Micro ceramic",
        qaItems: [
          { name: "Thermals", score: "90%" },
          { name: "Display", score: "83%" },
          { name: "Firmware", score: "76%" },
        ],
      },
    },
    products: {
      tag: "Full catalog",
      title: "Precision machines ready to ship",
      description:
        "Benchmarked, calibrated, and delivered with our white-glove setup flow. Pick a platform that unlocks your next build, stream, or production sprint.",
      emptyTitle: "No laptops found",
      emptySubtitle: "Check back soon as drops happen weekly.",
    },
    laptop: {
      signature: "Signature build",
      specs: {
        ram: "RAM",
        storage: "Storage",
        gpu: "GPU",
        display: "Display",
      },
      delete: "Delete",
      update: "Update",
      addToCart: "Add to cart",
      modalTitle: "Update configuration",
      save: "Save changes",
      cancel: "Cancel",
      fields: {
        brand: "Brand",
        model: "Model",
        processor: "Processor",
        ram: "RAM",
        storage: "Storage",
        graphicCard: "Graphic Card",
        screenSize: "Screen Size",
        price: "Price",
      },
    },
    catalog: {
      tag: "Admin view",
      title: "Manage current drops",
    },
    login: {
      tag: "Access panel",
      title: "Login",
      description: "Track orders, manage your drops, and sync preferences.",
      email: "Email",
      password: "Password",
      submit: "Login",
      emailPlaceholder: "hello@laptomania.studio",
      passwordPlaceholder: "••••••••",
    },
    signup: {
      tag: "Join the circle",
      title: "Create your Laptomania ID",
      description: "Unlock curated drops, fast track support, and custom build slots.",
      submit: "Sign up",
      fields: {
        name: {
          label: "Full name",
          placeholder: "Alex Mercer",
        },
        email: {
          label: "Email",
          placeholder: "alex@studio.com",
        },
        password: {
          label: "Password",
          placeholder: "••••••••",
        },
        phone: {
          label: "Phone",
          placeholder: "+44 7876 000",
        },
      },
    },
    profile: {
      tag: "Control room",
      title: "Profile",
      labels: {
        fullname: "Full name",
        email: "Email",
        phoneNumber: "Phone",
        role: "Role",
      },
      verification: "Verification",
      verified: "Verified",
      notVerified: "Not verified",
      createLaptop: "Create laptop",
      noAdmin: "No admin controls",
      upgradeMessage: "Upgrade to moderator for catalog access.",
      modal: {
        tag: "Create laptop",
        title: "Add a new configuration",
        fields: {
          brand: "Brand",
          model: "Model",
          processor: "Processor",
          ram: "RAM",
          storage: "Storage",
          graphicsCard: "Graphic card",
          screenSize: "Screen size",
          price: "Price",
        },
        images: "Images",
        create: "Create",
        cancel: "Cancel",
      },
    },
  },
  ka: {
    nav: {
      brand: "Laptomania",
      bagLabel: "ჩანთა",
      bagTitle: "შენი არჩევანი",
      emptyCart: "კალათა ცარიელია — დაამატე მეტი ძალა.",
      close: "დახურვა",
      remove: "ამოშლა",
      total: "ჯამი",
      clearCart: "კალათის გასუფთავება",
      cart: "კალათა",
      profile: "პროფილი",
      logout: "გასვლა",
      login: "შესვლა",
      signup: "რეგისტრაცია",
      currentlyViewing: "ახლა ხედავ",
      collection: "კოლექცია",
      navLinks: {
        home: "მთავარი",
        products: "პროდუქცია",
      },
    },
    home: {
      hero: {
        tag: "ჩვეულებრივზე მეტად ლეპტოპები",
        title: "ზუსტად შექმნილი მანქანები თანამედროვე შემოქმედებისთვის.",
        subtitle:
          "Laptomania არჩევს ფლაგმანურ და ლიმიტირებულ კონფიგურაციებს, რომლებიც რეალურ სამუშაო პროცესებს აგვარებს. თითოეული შასი ტესტირებულია, გაგრილება დამტკიცებულია და მზადაა ყოველდღიური დატვირთვისთვის.",
        buttons: {
          primary: "გამოშვების დათვალიერება",
          secondary: "ბენჩმარკ ლაბი",
        },
        badges: ["სტუდიო", "დეველოპერები", "გეიმერები", "სტუდენტები", "ბიზნესი"],
      },
      highlightStats: [
        { label: "მიწოდების სიჩქარე", value: "48სთ" },
        { label: "ინდივიდუალური კონფიგონ", value: "+120" },
        { label: "დაბრუნების მაჩვენებელი", value: "0.8%" },
      ],
      featureSection: {
        tag: "კურირებული კოლექციები",
        title: "აირჩიე რიტმი, რომელიც შენს სამუშაოს მიუსადაგდება",
        cta: "კატალოგი",
      },
      featureCards: [
        {
          title: "კრეატორების სერია",
          description:
            "ფერისადმი ზუსტი ეკრანები, 64GB მეხსიერება და უახლესი Ryzen HX პროცესორები 3D სამუშაოებისთვის.",
          badge: "ახალი",
        },
        {
          title: "მოგზაურის ულტრა",
          description:
            "ულტრატიი მაგნიუმის შასი, 20-საათიანი ავტონომიურობა და ჰაპტიკური ტაჩპედი.",
          badge: "1.3კგ",
        },
        {
          title: "ესპორტ პრო",
          description:
            "240Hz QHD miniLED, ორთქლის კამერის გაგრილება და მარტივად გამოცვლადი მექანიკური კლავიატურა.",
          badge: "ლიმიტირებული",
        },
      ],
      cardCta: "ვრცლად",
      cardStatus: "გაშვებაზე მზად",
      studio: {
        tag: "სტუდიო პროგრამა",
        title: "ინჟინრების მიერ შექმნილი, რეჟისორების მიერ გამართული.",
        text:
          "ყოველი სერია ახალ კრეატიულ სტუდიასთან ერთად იგეგმება, რათა არაორდინარული ფორმები გამოვცადოთ. ამ სეზონზე ვტესტავდით მოსახსნელ ტაჩპადებს, კარბონის დასადგამებს და მოდულურ IO რელსებს.",
        experimentLabel: "ექსპერიმენტი",
        experimentValue: "VaporFrame 003",
        surfaceLabel: "საფარის დამუშავება",
        surfaceValue: "მიკრო კერამიკა",
        qaItems: [
          { name: "თერმულები", score: "90%" },
          { name: "დისპლეი", score: "83%" },
          { name: "ფერმვერი", score: "76%" },
        ],
      },
    },
    products: {
      tag: "სრული კატალოგი",
      title: "ზუსტი მანქანები მიტანაზე მზად",
      description:
        "შედარებული, დაკალიბრებული და ხელთათმანიანი სერვისით მიწოდებული მოწყობილობები. აირჩიე პლატფორმა, რომელიც შენს შემდეგ პროექტს გაათავისუფლებს.",
      emptyTitle: "ლეპტოპები ვერ მოიძებნა",
      emptySubtitle: "მიეცი დრო — ახალი პარტიები ყოველ კვირას გამოდის.",
    },
    laptop: {
      signature: "სიგნატურული ასამბლეა",
      specs: {
        ram: "RAM",
        storage: "საცავი",
        gpu: "ვიდეობარათი",
        display: "ეკრანი",
      },
      delete: "წაშლა",
      update: "განახლება",
      addToCart: "კალათაში",
      modalTitle: "კონფიგურაციის განახლება",
      save: "ცვლილებების შენახვა",
      cancel: "გაუქმება",
      fields: {
        brand: "ბრენდი",
        model: "მოდელი",
        processor: "პროცესორი",
        ram: "RAM",
        storage: "საცავი",
        graphicCard: "ვიდეობარათი",
        screenSize: "ეკრანის ზომა",
        price: "ფასი",
      },
    },
    catalog: {
      tag: "ადმინისტრატორი",
      title: "მართე მიმდინარე დროფები",
    },
    login: {
      tag: "წვდომის პანელი",
      title: "შესვლა",
      description: "დააკვირდი შეკვეთებს, მართე გამოშვებები და სინქრონიზიე პარამეტრები.",
      email: "ელფოსტა",
      password: "პაროლი",
      submit: "შესვლა",
      emailPlaceholder: "hello@laptomania.studio",
      passwordPlaceholder: "••••••••",
    },
    signup: {
      tag: "წრეში შემოდი",
      title: "შექმენი Laptomania ID",
      description: "მიიღე კურირებული დროფები, პრიორიტეტული მხარდაჭერა და პერსონალური ასამბლეები.",
      submit: "რეგისტრაცია",
      fields: {
        name: {
          label: "სრული სახელი",
          placeholder: "ალექს მერსერი",
        },
        email: {
          label: "ელფოსტა",
          placeholder: "alex@studio.com",
        },
        password: {
          label: "პაროლი",
          placeholder: "••••••••",
        },
        phone: {
          label: "ტელეფონი",
          placeholder: "+995 5XX XXX",
        },
      },
    },
    profile: {
      tag: "საკონტროლო ოთახი",
      title: "პროფილი",
      labels: {
        fullname: "სრული სახელი",
        email: "ელფოსტა",
        phoneNumber: "ტელეფონი",
        role: "როლი",
      },
      verification: "ვერიფიკაცია",
      verified: "დამტკიცებულია",
      notVerified: "დაუმტკიცებელია",
      createLaptop: "ლეპტოპის შექმნა",
      noAdmin: "ადმინის პანელი მიუწვდომელია",
      upgradeMessage: "კატალოგთან წვდომისთვის გადაიხადე მოდერატორის სტატუსზე.",
      modal: {
        tag: "ლეპტოპის შექმნა",
        title: "დაამატე ახალი კონფიგურაცია",
        fields: {
          brand: "ბრენდი",
          model: "მოდელი",
          processor: "პროცესორი",
          ram: "RAM",
          storage: "საცავი",
          graphicsCard: "ვიდეობარათი",
          screenSize: "ეკრანის ზომა",
          price: "ფასი",
        },
        images: "სურათები",
        create: "შექმნა",
        cancel: "გაუქმება",
      },
    },
  },
};

const LanguageContext = createContext();

const getInitialLanguage = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem(LANGUAGE_KEY) || "en";
  }
  return "en";
};

const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(getInitialLanguage);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(LANGUAGE_KEY, language);
    }
  }, [language]);

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      availableLanguages: ["en", "ka"],
      t: (path) => {
        if (!path) return translations[language];
        return path.split(".").reduce((acc, key) => acc?.[key], translations[language]) ?? path;
      },
    }),
    [language]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

const useLanguage = () => useContext(LanguageContext);

export { LanguageProvider, useLanguage };
