# 🎯 Интеграция аналитики в компоненты

Краткое руководство по добавлению трекинга в остальные компоненты studio.ai

---

## ✅ Уже интегрировано

### App.tsx
- ✅ Инициализация аналитики
- ✅ Автоматический трекинг просмотров страниц

### Hero.tsx
- ✅ Клик на кнопку Telegram
- ✅ Клик на кнопку Email

### AIConsultantPage.tsx
- ✅ Разблокировка чата
- ✅ Отправка вопроса

### ProjectDetailPage.tsx
- ✅ Просмотр проекта

---

## 📋 Компоненты для интеграции

### 1. ContactForm.tsx

```typescript
import { trackFormSubmit } from "../utils/analytics";

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  
  try {
    // Ваша логика отправки формы
    await sendContactForm(formData);
    
    // Трекинг успешной отправки
    trackFormSubmit('contact_form', true);
    
    // Показать success сообщение
    showSuccessMessage();
  } catch (error) {
    // Трекинг ошибки
    trackFormSubmit('contact_form', false);
    
    // Показать error сообщение
    showErrorMessage();
  }
};
```

### 2. ProjectContactModal.tsx

```typescript
import { trackFormSubmit, trackEvent } from "../utils/analytics";

// При открытии модала
const openModal = () => {
  setIsOpen(true);
  trackEvent('project_contact_modal_open', {
    project_id: projectId,
    project_name: projectName,
  });
};

// При отправке формы
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  
  try {
    await sendProjectInquiry(formData);
    trackFormSubmit('project_contact_form', true);
    setIsOpen(false);
  } catch (error) {
    trackFormSubmit('project_contact_form', false);
  }
};
```

### 3. Portfolio.tsx (категории)

```typescript
import { trackEvent } from "../utils/analytics";

// При клике на проект
const handleProjectClick = (category: string, index: number) => {
  trackEvent('portfolio_project_click', {
    category: category,
    project_index: index,
  });
  
  // Ваша логика
  onProjectClick(category, index);
};

// При фильтрации
const handleFilter = (filter: string) => {
  trackEvent('portfolio_filter', {
    filter_type: filter,
  });
  
  setActiveFilter(filter);
};
```

### 4. PortfolioPage.tsx

```typescript
import { trackEvent } from "../utils/analytics";

// При клике на категорию
const handleCategoryClick = (category: string) => {
  trackEvent('portfolio_category_click', {
    category: category,
  });
  
  onCategoryClick(category);
};
```

### 5. ServicesPage.tsx

```typescript
import { trackServiceInterest } from "../utils/analytics";

// При клике на услугу
const handleServiceClick = (serviceName: string) => {
  trackServiceInterest(serviceName);
  
  // Показать детали или открыть модал
  showServiceDetails(serviceName);
};

// При клике на CTA для услуги
const handleServiceCTA = (serviceName: string) => {
  trackEvent('service_cta_click', {
    service_name: serviceName,
    location: 'services_page',
  });
  
  openContactForm(serviceName);
};
```

### 6. Navigation.tsx

```typescript
import { trackEvent } from "../utils/analytics";

// При клике на пункт меню
const handleNavigationClick = (page: string) => {
  trackEvent('navigation_click', {
    page: page,
    from_page: currentPage,
  });
  
  onNavigate(page);
};

// При открытии/закрытии мобильного меню
const toggleMobileMenu = () => {
  setIsMobileMenuOpen(!isMobileMenuOpen);
  
  trackEvent('mobile_menu_toggle', {
    action: !isMobileMenuOpen ? 'open' : 'close',
  });
};
```

### 7. ThemeProvider.tsx

```typescript
import { trackEvent } from "../utils/analytics";

const toggleTheme = () => {
  const newTheme = theme === "dark" ? "light" : "dark";
  setTheme(newTheme);
  
  trackEvent('theme_toggle', {
    from_theme: theme,
    to_theme: newTheme,
  });
};
```

### 8. Footer.tsx

```typescript
import { trackButtonClick, trackOutboundLink } from "../utils/analytics";

// При клике на email
<a 
  href="mailto:hello@studio.ai"
  onClick={() => trackButtonClick('Email', 'footer')}
>
  hello@studio.ai
</a>

// При клике на Telegram
<a 
  href="https://t.me/studio_ai"
  target="_blank"
  rel="noopener noreferrer"
  onClick={() => trackOutboundLink('https://t.me/studio_ai', 'Telegram Footer')}
>
  Telegram
</a>

// При клике на навигацию в футере
<button 
  onClick={() => {
    trackEvent('footer_navigation', { page: 'services' });
    onNavigate('services');
  }}
>
  Услуги
</button>
```

### 9. FAQPage.tsx

```typescript
import { trackEvent } from "../utils/analytics";

// При раскрытии вопроса
const handleQuestionClick = (questionId: string, questionText: string) => {
  trackEvent('faq_question_click', {
    question_id: questionId,
    question: questionText,
  });
};

// Можно использовать с Accordion
<Accordion.Item value={item.id}>
  <Accordion.Trigger 
    onClick={() => handleQuestionClick(item.id, item.question)}
  >
    {item.question}
  </Accordion.Trigger>
  <Accordion.Content>
    {item.answer}
  </Accordion.Content>
</Accordion.Item>
```

### 10. Work.tsx (Featured Projects)

```typescript
import { trackEvent } from "../utils/analytics";

// При клике на featured проект
const handleFeaturedProjectClick = (projectId: string, projectName: string) => {
  trackEvent('featured_project_click', {
    project_id: projectId,
    project_name: projectName,
    location: 'home_page',
  });
  
  onProjectClick(projectId);
};
```

---

## 🎨 Дополнительные события

### Scroll Depth Tracking

Создайте хук `/hooks/useScrollDepth.ts`:

```typescript
import { useEffect, useState } from 'react';
import { trackScrollDepth } from '../utils/analytics';

export function useScrollDepth() {
  const [depths, setDepths] = useState({
    25: false,
    50: false,
    75: false,
    100: false,
  });

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const scrolled = (scrollTop / (documentHeight - windowHeight)) * 100;

      if (scrolled >= 25 && !depths[25]) {
        trackScrollDepth(25);
        setDepths(prev => ({ ...prev, 25: true }));
      }
      if (scrolled >= 50 && !depths[50]) {
        trackScrollDepth(50);
        setDepths(prev => ({ ...prev, 50: true }));
      }
      if (scrolled >= 75 && !depths[75]) {
        trackScrollDepth(75);
        setDepths(prev => ({ ...prev, 75: true }));
      }
      if (scrolled >= 100 && !depths[100]) {
        trackScrollDepth(100);
        setDepths(prev => ({ ...prev, 100: true }));
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [depths]);
}
```

Используйте в компонентах страниц:

```typescript
import { useScrollDepth } from '../hooks/useScrollDepth';

export function HomePage() {
  useScrollDepth(); // Автоматически трекает глубину прокрутки
  
  return (
    // ...
  );
}
```

### Video Tracking (если будут видео)

```typescript
import { trackVideo } from "../utils/analytics";

<video
  onPlay={() => trackVideo('play', 'Homepage Hero Video')}
  onPause={() => trackVideo('pause', 'Homepage Hero Video')}
  onEnded={() => trackVideo('complete', 'Homepage Hero Video')}
>
  <source src="/video.mp4" type="video/mp4" />
</video>
```

### Search Tracking (если будет поиск)

```typescript
import { trackEvent } from "../utils/analytics";

const handleSearch = (query: string) => {
  trackEvent('search', {
    search_query: query,
    results_count: searchResults.length,
  });
};
```

---

## 🔍 Отладка

### Проверка событий в консоли

Откройте DevTools → Console. При каждом событии вы увидите:

```
📊 Event tracked: button_click { button_name: 'Telegram', location: 'hero' }
📊 Page view tracked: { page_path: '/services', page_title: 'Услуги' }
```

### Проверка в Google Analytics

1. Откройте GA4 → Reports → Realtime
2. Совершите действие на сайте
3. Событие должно появиться в реальном времени

### Проверка в Яндекс.Метрике

1. Откройте счетчик → "Сейчас на сайте"
2. Совершите действие
3. Посмотрите вебвизор для записи сеанса

---

## 📊 Приоритет интеграции

### Критически важные (сделать сразу)
1. ✅ ContactForm.tsx - отправка формы
2. ✅ ProjectContactModal.tsx - запрос по проекту
3. ✅ Navigation.tsx - клики по меню
4. ✅ Portfolio.tsx - просмотры проектов

### Важные (сделать в течение недели)
5. ServicesPage.tsx - интерес к услугам
6. Footer.tsx - клики по ссылкам
7. ThemeProvider.tsx - переключение темы
8. FAQPage.tsx - популярные вопросы

### Желательные (можно позже)
9. useScrollDepth - глубина прокрутки
10. Video tracking - если будут видео
11. Search tracking - если будет поиск

---

## 🎯 Целевые метрики

### Основные конверсии
- **Отправка формы обратной связи** - основная цель
- **Клик на Telegram** - альтернативный контакт
- **Запрос по проекту** - лид
- **Взаимодействие с AI** - вовлеченность

### Метрики вовлеченности
- Глубина прокрутки (≥75% = заинтересован)
- Время на странице
- Количество просмотренных страниц
- Просмотр 3+ проектов

### Источники трафика
- Organic Search
- Direct
- Referral
- Social Media

---

## 📞 Поддержка

Вопросы по интеграции аналитики:
- Смотрите `/ANALYTICS-GUIDE.md` для подробной документации
- Email: hello@studio.ai

---

**Версия:** 1.0.0  
**Дата:** 04.11.2025
