"use client";

import { motion } from "motion/react";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useState } from "react";

type Project = {
  title: string;
  description: string;
  tags: string[];
  image: string;
  results?: string;
};

const portfolioData: Record<string, { title: string; projects: Project[] }> = {
  landings: {
    title: "Лендинги",
    projects: [
      {
        title: "Лендинг для SaaS-продукта",
        description: "Продающий лендинг для B2B SaaS с интеграцией CRM и аналитикой поведения пользователей. Конверсия в заявку 12%.",
        tags: ["Next.js", "Tailwind", "Framer Motion", "HubSpot"],
        image: "https://images.unsplash.com/photo-1642132652798-ae887edb9e9d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB3ZWJzaXRlJTIwbGFuZGluZ3xlbnwxfHx8fDE3NjIxMTM1OTJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
        results: "Конверсия 12%, +240% трафика",
      },
      {
        title: "Лендинг мобильного приложения",
        description: "Яркий лендинг для мобильного финтех-приложения с анимациями и App Store интеграцией.",
        tags: ["React", "GSAP", "TypeScript"],
        image: "https://images.unsplash.com/photo-1642132652798-ae887edb9e9d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB3ZWJzaXRlJTIwbGFuZGluZ3xlbnwxfHx8fDE3NjIxMTM1OTJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
        results: "50K+ установок за 3 месяца",
      },
      {
        title: "Промо-сайт продукта",
        description: "Лендинг для запуска нового продукта с countdown таймером и предзаказом.",
        tags: ["Vue.js", "Nuxt", "Stripe"],
        image: "https://images.unsplash.com/photo-1642132652798-ae887edb9e9d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB3ZWJzaXRlJTIwbGFuZGluZ3xlbnwxfHx8fDE3NjIxMTM1OTJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
        results: "2000+ предзаказов",
      },
      {
        title: "Лендинг для медицинской клиники",
        description: "Премиальный лендинг с онлайн-записью, калькулятором стоимости услуг и виртуальным туром по клинике.",
        tags: ["Next.js", "3D", "Booking System"],
        image: "https://images.unsplash.com/photo-1642132652798-ae887edb9e9d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB3ZWJzaXRlJTIwbGFuZGluZ3xlbnwxfHx8fDE3NjIxMTM1OTJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
        results: "+350% онлайн-записей",
      },
      {
        title: "Лендинг для фитнес-клуба",
        description: "Динамичный лендинг с видео-фоном, расписанием занятий и системой покупки абонементов.",
        tags: ["React", "Video Background", "Payment Integration"],
        image: "https://images.unsplash.com/photo-1642132652798-ae887edb9e9d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB3ZWJzaXRlJTIwbGFuZGluZ3xlbnwxfHx8fDE3NjIxMTM1OTJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
        results: "1200+ проданных абонементов",
      },
      {
        title: "Лендинг для агентства недвижимости",
        description: "Лендинг жилого комплекса с интерактивным генпланом, выбором квартиры и VR-туром.",
        tags: ["Three.js", "WebGL", "Interactive"],
        image: "https://images.unsplash.com/photo-1642132652798-ae887edb9e9d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB3ZWJzaXRlJTIwbGFuZGluZ3xlbnwxfHx8fDE3NjIxMTM1OTJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
        results: "Продано 85% квартир за 6 месяцев",
      },
      {
        title: "Лендинг для ресторана",
        description: "Стильный лендинг с онлайн-меню, бронированием столиков и интеграцией с доставкой.",
        tags: ["Next.js", "Reservation System", "Menu"],
        image: "https://images.unsplash.com/photo-1642132652798-ae887edb9e9d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB3ZWJzaXRlJTIwbGFuZGluZ3xlbnwxfHx8fDE3NjIxMTM1OTJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
        results: "+200% бронирований через сайт",
      },
      {
        title: "Лендинг для онлайн-курса",
        description: "Конверсионный лендинг образовательного курса с видео-отзывами и рассрочкой платежа.",
        tags: ["React", "Video", "Payment Plans"],
        image: "https://images.unsplash.com/photo-1642132652798-ae887edb9e9d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB3ZWJzaXRlJTIwbGFuZGluZ3xlbnwxfHx8fDE3NjIxMTM1OTJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
        results: "3000+ студентов за запуск",
      },
    ],
  },
  corporate: {
    title: "Корпоративные сайты",
    projects: [
      {
        title: "Сайт производственной компании",
        description: "Многостраничный корпоративный сайт с каталогом продукции, формой запроса КП и личным кабинетом для дилеров.",
        tags: ["Next.js", "PostgreSQL", "CMS", "SEO"],
        image: "https://images.unsplash.com/photo-1666541679286-1cf6b3434483?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3Jwb3JhdGUlMjBvZmZpY2UlMjBidWlsZGluZ3xlbnwxfHx8fDE3NjIxMDYzNDh8MA&ixlib=rb-4.1.0&q=80&w=1080",
        results: "TOP-3 в Яндекс по 20+ запросам",
      },
      {
        title: "Сайт юридической компании",
        description: "Премиальный сайт с блогом, калькулятором услуг и онлайн-консультациями через интеграцию с календарем.",
        tags: ["WordPress", "Custom Theme", "Calendly"],
        image: "https://images.unsplash.com/photo-1666541679286-1cf6b3434483?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3Jwb3JhdGUlMjBvZmZpY2UlMjBidWlsZGluZ3xlbnwxfHx8fDE3NjIxMDYzNDh8MA&ixlib=rb-4.1.0&q=80&w=1080",
        results: "+180% конверсии в консультации",
      },
      {
        title: "Портал HR-компании",
        description: "Корпоративный сайт рекрутинговой компании с поиском вакансий, блогом и подбором резюме.",
        tags: ["React", "Node.js", "MongoDB"],
        image: "https://images.unsplash.com/photo-1666541679286-1cf6b3434483?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3Jwb3JhdGUlMjBvZmZpY2UlMjBidWlsZGluZ3xlbnwxfHx8fDE3NjIxMDYzNDh8MA&ixlib=rb-4.1.0&q=80&w=1080",
        results: "5000+ вакансий размещено",
      },
      {
        title: "Сайт строительной компании",
        description: "Корпоративный портал застройщика с каталогом объектов, ходом строительства и ипотечным калькулятором.",
        tags: ["Next.js", "CMS", "Mortgage Calculator"],
        image: "https://images.unsplash.com/photo-1666541679286-1cf6b3434483?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3Jwb3JhdGUlMjBvZmZpY2UlMjBidWlsZGluZ3xlbnwxfHx8fDE3NjIxMDYzNDh8MA&ixlib=rb-4.1.0&q=80&w=1080",
        results: "8 жилых комплексов на сайте",
      },
      {
        title: "Сайт консалтинговой компании",
        description: "Сайт управленческого консалтинга с кейсами, командой экспертов и формой заявки на аудит.",
        tags: ["WordPress", "Case Studies", "Team Page"],
        image: "https://images.unsplash.com/photo-1666541679286-1cf6b3434483?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3Jwb3JhdGUlMjBvZmZpY2UlMjBidWlsZGluZ3xlbnwxfHx8fDE3NjIxMDYzNDh8MA&ixlib=rb-4.1.0&q=80&w=1080",
        results: "TOP-5 в Google по целевым запросам",
      },
      {
        title: "Сайт медицинского центра",
        description: "Многостраничный сайт клиники с описанием услуг, врачами, онлайн-записью и отзывами.",
        tags: ["Next.js", "Appointment System", "Reviews"],
        image: "https://images.unsplash.com/photo-1666541679286-1cf6b3434483?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3Jwb3JhdGUlMjBvZmZpY2UlMjBidWlsZGluZ3xlbnwxfHx8fDE3NjIxMDYzNDh8MA&ixlib=rb-4.1.0&q=80&w=1080",
        results: "+400% записей через сайт",
      },
      {
        title: "Сайт IT-компании",
        description: "Технологичный корпоративный сайт с портфолио, технологическим стеком и карьерными возможностями.",
        tags: ["React", "Animations", "Career Portal"],
        image: "https://images.unsplash.com/photo-1666541679286-1cf6b3434483?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3Jwb3JhdGUlMjBvZmZpY2UlMjBidWlsZGluZ3xlbnwxfHx8fDE3NjIxMDYzNDh8MA&ixlib=rb-4.1.0&q=80&w=1080",
        results: "200+ резюме за месяц",
      },
      {
        title: "Сайт логистической компании",
        description: "Корпоративный портал с калькулятором доставки, трекингом грузов и личным кабинетом.",
        tags: ["Next.js", "Tracking System", "Calculator"],
        image: "https://images.unsplash.com/photo-1666541679286-1cf6b3434483?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3Jwb3JhdGUlMjBvZmZpY2UlMjBidWlsZGluZ3xlbnwxfHx8fDE3NjIxMDYzNDh8MA&ixlib=rb-4.1.0&q=80&w=1080",
        results: "1000+ клиентов в системе",
      },
    ],
  },
  ecommerce: {
    title: "Интернет-магазины",
    projects: [
      {
        title: "Магазин одежды",
        description: "E-commerce с примеркой через AR, персональными рекомендациями на AI и программой лояльности.",
        tags: ["Shopify", "AI", "AR", "Stripe"],
        image: "https://images.unsplash.com/photo-1658297063569-162817482fb6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvbmxpbmUlMjBzaG9wcGluZyUyMGVjb21tZXJjZXxlbnwxfHx8fDE3NjIxNTczNzZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
        results: "₽12M выручки за 6 месяцев",
      },
      {
        title: "Магазин электроники",
        description: "Интернет-магазин с умным поиском, сравнением товаров и интеграцией с 1С для учета складов.",
        tags: ["WooCommerce", "1C", "Elasticsearch"],
        image: "https://images.unsplash.com/photo-1658297063569-162817482fb6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvbmxpbmUlMjBzaG9wcGluZyUyMGVjb21tZXJjZXxlbnwxfHx8fDE3NjIxNTczNzZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
        results: "3000+ товаров, автоматизация склада",
      },
      {
        title: "Маркетплейс услуг",
        description: "Платформа для бронирования услуг мастеров красоты с онлайн-оплатой и системой отзывов.",
        tags: ["Next.js", "Stripe", "PostgreSQL"],
        image: "https://images.unsplash.com/photo-1658297063569-162817482fb6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvbmxpbmUlMjBzaG9wcGluZyUyMGVjb21tZXJjZXxlbnwxfHx8fDE3NjIxNTczNzZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
        results: "500+ мастеров на платформе",
      },
      {
        title: "Магазин косметики",
        description: "E-commerce для beauty-бренда с quiz подбором средств, подпиской и программой лояльности.",
        tags: ["Shopify", "Quiz", "Subscriptions"],
        image: "https://images.unsplash.com/photo-1658297063569-162817482fb6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvbmxpbmUlMjBzaG9wcGluZyUyMGVjb21tZXJjZXxlbnwxfHx8fDE3NjIxNTczNzZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
        results: "25% конверсия через quiz",
      },
      {
        title: "Магазин мебели",
        description: "Интернет-магазин с 3D-визуализацией мебели в интерьере и конфигуратором для кастомизации.",
        tags: ["Next.js", "3D Configurator", "WebGL"],
        image: "https://images.unsplash.com/photo-1658297063569-162817482fb6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvbmxpbmUlMjBzaG9wcGluZyUyMGVjb21tZXJjZXxlbnwxfHx8fDE3NjIxNTczNzZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
        results: "AOV вырос на 40%",
      },
      {
        title: "Магазин спортивного питания",
        description: "E-commerce с калькулятором дневной нормы, подборкой программ питания и быстрым повтором заказа.",
        tags: ["WooCommerce", "Calculator", "Auto-reorder"],
        image: "https://images.unsplash.com/photo-1658297063569-162817482fb6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvbmxpbmUlMjBzaG9wcGluZyUyMGVjb21tZXJjZXxlbnwxfHx8fDE3NjIxNTczNzZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
        results: "60% клиентов делают повторные покупки",
      },
      {
        title: "Магазин детских товаров",
        description: "Интернет-магазин с системой подарочных сертификатов, wishlist и удобной фильтрацией по возрасту.",
        tags: ["Shopify", "Gift Cards", "Age Filter"],
        image: "https://images.unsplash.com/photo-1658297063569-162817482fb6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvbmxpbmUlMjBzaG9wcGluZyUyMGVjb21tZXJjZXxlbnwxfHx8fDE3NjIxNTczNzZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
        results: "₽8M выручки в первый год",
      },
      {
        title: "Книжный интернет-магазин",
        description: "E-commerce для книг с персональными рекомендациями, предзаказом новинок и читательским клубом.",
        tags: ["Next.js", "Recommendations", "Community"],
        image: "https://images.unsplash.com/photo-1658297063569-162817482fb6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvbmxpbmUlMjBzaG9wcGluZyUyMGVjb21tZXJjZXxlbnwxfHx8fDE3NjIxNTczNzZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
        results: "15000+ товаров, 5000+ клиентов",
      },
    ],
  },
  webapps: {
    title: "Веб-приложения",
    projects: [
      {
        title: "CRM система для застройщика",
        description: "Кастомная CRM для управления продажами недвижимости с планировщиком, аналитикой и интеграцией с банками.",
        tags: ["React", "Node.js", "PostgreSQL", "WebSocket"],
        image: "https://images.unsplash.com/photo-1665470909939-959569b20021?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWIlMjBhcHBsaWNhdGlvbiUyMGRhc2hib2FyZHxlbnwxfHx8fDE3NjIxMTQzNjB8MA&ixlib=rb-4.1.0&q=80&w=1080",
        results: "Экономия 40 часов/неделю",
      },
      {
        title: "Платформа для обучения",
        description: "LMS-система с видеоуроками, тестами, сертификатами и геймификацией обучения.",
        tags: ["Vue.js", "Laravel", "MySQL", "AWS"],
        image: "https://images.unsplash.com/photo-1665470909939-959569b20021?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWIlMjBhcHBsaWNhdGlvbiUyMGRhc2hib2FyZHxlbnwxfHx8fDE3NjIxMTQzNjB8MA&ixlib=rb-4.1.0&q=80&w=1080",
        results: "10,000+ активных студентов",
      },
      {
        title: "Система бронирования",
        description: "Веб-приложение для бронирования переговорных комнат и рабочих мест в коворкинге.",
        tags: ["React", "Firebase", "Google Calendar"],
        image: "https://images.unsplash.com/photo-1665470909939-959569b20021?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWIlMjBhcHBsaWNhdGlvbiUyMGRhc2hib2FyZHxlbnwxfHx8fDE3NjIxMTQzNjB8MA&ixlib=rb-4.1.0&q=80&w=1080",
        results: "3 локации, 5000+ броней/месяц",
      },
      {
        title: "Платформа для фрилансеров",
        description: "Маркетплейс для поиска исполнителей с системой безопасных сделок, отзывами и портфолио.",
        tags: ["Next.js", "Escrow", "Rating System"],
        image: "https://images.unsplash.com/photo-1665470909939-959569b20021?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWIlMjBhcHBsaWNhdGlvbiUyMGRhc2hib2FyZHxlbnwxfHx8fDE3NjIxMTQzNjB8MA&ixlib=rb-4.1.0&q=80&w=1080",
        results: "2000+ фрилансеров на платформе",
      },
      {
        title: "Система управления задачами",
        description: "Таск-менеджер для команд с канбан-досками, временными треками и отчетностью.",
        tags: ["React", "Kanban", "Time Tracking"],
        image: "https://images.unsplash.com/photo-1665470909939-959569b20021?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWIlMjBhcHBsaWNhdGlvbiUyMGRhc2hib2FyZHxlbnwxfHx8fDE3NjIxMTQzNjB8MA&ixlib=rb-4.1.0&q=80&w=1080",
        results: "50+ команд используют систему",
      },
      {
        title: "HR-платформа для рекрутинга",
        description: "ATS-система для подбора персонала с парсингом резюме, воронкой кандидатов и автоматизацией.",
        tags: ["Vue.js", "AI Parsing", "Automation"],
        image: "https://images.unsplash.com/photo-1665470909939-959569b20021?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWIlMjBhcHBsaWNhdGlvbiUyMGRhc2hib2FyZHxlbnwxfHx8fDE3NjIxMTQzNjB8MA&ixlib=rb-4.1.0&q=80&w=1080",
        results: "Сокращение времени найма на 50%",
      },
      {
        title: "Платформа для инвесторов",
        description: "Веб-приложение для управления инвестиционным портфелем с аналитикой и автоматической ребалансировкой.",
        tags: ["React", "Financial API", "Charts"],
        image: "https://images.unsplash.com/photo-1665470909939-959569b20021?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWIlMjBhcHBsaWNhdGlvbiUyMGRhc2hib2FyZHxlbnwxfHx8fDE3NjIxMTQzNjB8MA&ixlib=rb-4.1.0&q=80&w=1080",
        results: "Под управлением $5M активов",
      },
      {
        title: "Система складского учета",
        description: "WMS-система для управления складом с мобильным приложением для сканирования и инвентаризации.",
        tags: ["React", "Mobile App", "Barcode Scanner"],
        image: "https://images.unsplash.com/photo-1665470909939-959569b20021?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWIlMjBhcHBsaWNhdGlvbiUyMGRhc2hib2FyZHxlbnwxfHx8fDE3NjIxMTQzNjB8MA&ixlib=rb-4.1.0&q=80&w=1080",
        results: "Точность учета 99.8%",
      },
    ],
  },
  uiux: {
    title: "UI/UX дизайн",
    projects: [
      {
        title: "Редизайн банковского приложения",
        description: "Полный редизайн мобильного приложения банка с фокусом на упрощение UX и доступность.",
        tags: ["Figma", "User Research", "Prototyping", "A/B Testing"],
        image: "https://images.unsplash.com/photo-1618761714954-0b8cd0026356?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1aSUyMGRlc2lnbiUyMGludGVyZmFjZXxlbnwxfHx8fDE3NjIxMjQzNjN8MA&ixlib=rb-4.1.0&q=80&w=1080",
        results: "NPS вырос с 42 до 68",
      },
      {
        title: "Дизайн SaaS-dashboard",
        description: "Интерфейс аналитической панели для маркетологов с кастомными графиками и отчетами.",
        tags: ["Figma", "Data Visualization", "Design System"],
        image: "https://images.unsplash.com/photo-1618761714954-0b8cd0026356?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1aSUyMGRlc2lnbiUyMGludGVyZmFjZXxlbnwxfHx8fDE3NjIxMjQzNjN8MA&ixlib=rb-4.1.0&q=80&w=1080",
        results: "Время работы с данными -60%",
      },
      {
        title: "Мобильное приложение доставки",
        description: "UI/UX для приложения доставки еды с трекингом заказа в реальном времени.",
        tags: ["Figma", "Mobile Design", "iOS", "Android"],
        image: "https://images.unsplash.com/photo-1618761714954-0b8cd0026356?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1aSUyMGRlc2lnbiUyMGludGVyZmFjZXxlbnwxfHx8fDE3NjIxMjQzNjN8MA&ixlib=rb-4.1.0&q=80&w=1080",
        results: "4.8★ в App Store, 100K+ загрузок",
      },
      {
        title: "UX-аудит e-commerce платформы",
        description: "Комплексный UX-аудит интернет-магазина с тепловыми картами, сессиями пользователей и рекомендациями.",
        tags: ["UX Audit", "Heatmaps", "User Testing"],
        image: "https://images.unsplash.com/photo-1618761714954-0b8cd0026356?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1aSUyMGRlс2lnbiUyMGludGVyZmFjZXxlbnwxfHx8fDE3NjIxMjQzNjN8MA&ixlib=rb-4.1.0&q=80&w=1080",
        results: "Конверсия выросла на 35%",
      },
      {
        title: "Дизайн приложения для фитнеса",
        description: "UI/UX мобильного приложения для тренировок с персональными планами и трекингом прогресса.",
        tags: ["Figma", "Mobile UI", "Gamification"],
        image: "https://images.unsplash.com/photo-1618761714954-0b8cd0026356?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1aSUyMGRlc2lnbiUyMGludGVyZmFjZXxlbnwxfHx8fDE3NjIxMjQzNjN8MA&ixlib=rb-4.1.0&q=80&w=1080",
        results: "Retention rate 65% после 30 дней",
      },
      {
        title: "Редизайн образовательной платформы",
        description: "Переработка интерфейса онлайн-школы с фокусом на вовлеченность и доходимость до конца курса.",
        tags: ["Figma", "User Flow", "Engagement"],
        image: "https://images.unsplash.com/photo-1618761714954-0b8cd0026356?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1aSUyMGRlc2lnbiUyMGludGVyZmFjZXxlbnwxfHx8fDE3NjIxMjQzNjN8MA&ixlib=rb-4.1.0&q=80&w=1080",
        results: "Completion rate вырос с 35% до 58%",
      },
      {
        title: "Дизайн медицинского портала",
        description: "UI/UX для платформы телемедицины с записью к врачам, видеоконсультациями и электронными рецептами.",
        tags: ["Figma", "Healthcare", "Accessibility"],
        image: "https://images.unsplash.com/photo-1618761714954-0b8cd0026356?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1aSUyMGRlc2lnbiUyMGludGVyZmFjZXxlbnwxfHx8fDE3NjIxMjQzNjN8MA&ixlib=rb-4.1.0&q=80&w=1080",
        results: "15000+ консультаций за месяц",
      },
      {
        title: "Интерфейс CRM для продаж",
        description: "Дизайн удобной CRM-системы для отдела продаж с визуализацией воронки и быстрыми действиями.",
        tags: ["Figma", "CRM Design", "Sales Funnel"],
        image: "https://images.unsplash.com/photo-1618761714954-0b8cd0026356?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1aSUyMGRlc2lnbiUyMGludGVyZmFjZXxlbnwxfHx8fDE3NjIxMjQzNjN8MA&ixlib=rb-4.1.0&q=80&w=1080",
        results: "Скорость работы менеджеров +45%",
      },
    ],
  },
  logos: {
    title: "Логотипы",
    projects: [
      {
        title: "Логотип финтех-стартапа",
        description: "Минималистичный логотип и фирменный стиль для финансового приложения.",
        tags: ["Illustrator", "Brand Identity", "Typography"],
        image: "https://images.unsplash.com/photo-1748326650737-33500fdfda30?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsb2dvJTIwYnJhbmRpbmclMjBkZXNpZ258ZW58MXx8fHwxNzYyMTk2MDYzfDA&ixlib=rb-4.1.0&q=80&w=1080",
        results: "Узнаваемость бренда +300%",
      },
      {
        title: "Ребрендинг сети кофеен",
        description: "Новый логотип и визуальная айдентика для сети из 15 кофеен.",
        tags: ["Illustrator", "Packaging", "Brand Guidelines"],
        image: "https://images.unsplash.com/photo-1748326650737-33500fdfda30?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsb2dvJTIwYnJhbmRpbmclMjBkZXNpZ258ZW58MXx8fHwxNzYyMTk2MDYzfDA&ixlib=rb-4.1.0&q=80&w=1080",
        results: "15 точек, единый стиль",
      },
      {
        title: "Логотип IT-компании",
        description: "Технологичный логотип для компании разработчиков с адаптивной версией.",
        tags: ["Figma", "Vector", "Responsive"],
        image: "https://images.unsplash.com/photo-1748326650737-33500fdfda30?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsb2dvJTIwYnJhbmRpbmclMjBkZXNpZ258ZW58MXx8fHwxNzYyMTk2MDYzfDA&ixlib=rb-4.1.0&q=80&w=1080",
        results: "Премия Russian Design Award",
      },
      {
        title: "Логотип для спортивного бренда",
        description: "Динамичный логотип для производителя спортивной одежды с современной типографикой.",
        tags: ["Illustrator", "Sports Branding", "Dynamic"],
        image: "https://images.unsplash.com/photo-1748326650737-33500fdfda30?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsb2dvJTIwYnJhbmRpbmclMjBkZXNpZ258ZW58MXx8fHwxNzYyMTk2MDYzfDA&ixlib=rb-4.1.0&q=80&w=1080",
        results: "Использован на 200+ товарах",
      },
      {
        title: "Логотип ресторана",
        description: "Элегантный логотип для премиального ресторана с кастомной леттерингом.",
        tags: ["Lettering", "Luxury", "F&B"],
        image: "https://images.unsplash.com/photo-1748326650737-33500fdfda30?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsb2dvJTIwYnJhbmRpbmclMjBkZXNpZ258ZW58MXx8fHwxNzYyMTk2MDYzfDA&ixlib=rb-4.1.0&q=80&w=1080",
        results: "Попал в топ-10 ресторанов города",
      },
      {
        title: "Логотип для экологического проекта",
        description: "Органичный логотип для компании по переработке отходов с акцентом на природу.",
        tags: ["Eco Design", "Organic", "Symbolism"],
        image: "https://images.unsplash.com/photo-1748326650737-33500fdfda30?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsb2dvJTIwYnJhbmRpbmclMjBkZXNpZ258ZW58MXx8fHwxNzYyMTk2MDYzfDA&ixlib=rb-4.1.0&q=80&w=1080",
        results: "Узнаваемость в экологическом сегменте",
      },
      {
        title: "Логотип медицинской клиники",
        description: "Современный медицинский логотип с символикой здоровья и доверия.",
        tags: ["Medical", "Trust", "Modern"],
        image: "https://images.unsplash.com/photo-1748326650737-33500fdfda30?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsb2dvJTIwYnJhbmRpbmclMjBkZXNpZ258ZW58MXx8fHwxNzYyMTk2MDYzfDA&ixlib=rb-4.1.0&q=80&w=1080",
        results: "5 филиалов используют айдентику",
      },
      {
        title: "Логотип для образовательного проекта",
        description: "Дружелюбный логотип для онлайн-школы для детей с игровыми элементами.",
        tags: ["Education", "Kids", "Playful"],
        image: "https://images.unsplash.com/photo-1748326650737-33500fdfda30?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsb2dvJTIwYnJhbmRpbmclMjBkZXNpZ258ZW58MXx8fHwxNzYyMTk2MDYzfDA&ixlib=rb-4.1.0&q=80&w=1080",
        results: "5000+ учеников в школе",
      },
    ],
  },
  branding: {
    title: "Брендинг",
    projects: [
      {
        title: "Брендинг косметического бренда",
        description: "Полная разработка визуального стиля: от логотипа до упаковки и маркетинговых материалов.",
        tags: ["Brand Identity", "Packaging", "Marketing Materials"],
        image: "https://images.unsplash.com/photo-1748326650737-33500fdfda30?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsb2dvJTIwYnJhbmRpbmclMjBkZXNpZ258ZW58MXx8fHwxNzYyMTk2MDYzfDA&ixlib=rb-4.1.0&q=80&w=1080",
        results: "Запуск в 200+ магазинах",
      },
      {
        title: "Фирменный стиль застройщика",
        description: "Корпоративная айдентика для девелоперской компании с brandbook на 80+ страниц.",
        tags: ["Brand Guidelines", "Print Design", "Digital"],
        image: "https://images.unsplash.com/photo-1748326650737-33500fdfda30?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsb2dvJTIwYnJhbmRpbmclMjBkZXNpZ258ZW58MXx8fHwxNzYyMTk2MDYzfDA&ixlib=rb-4.1.0&q=80&w=1080",
        results: "Единый стиль для 5 ЖК",
      },
      {
        title: "Брендинг образовательной платформы",
        description: "Создание визуального языка для онлайн-школы: от логотипа до UI-kit.",
        tags: ["Brand Identity", "UI Kit", "Motion Design"],
        image: "https://images.unsplash.com/photo-1748326650737-33500fdfda30?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsb2dvJTIwYnJhbmRpbmclMjBkZXNpZ258ZW58MXx8fHwxNzYyMTk2MDYzfDA&ixlib=rb-4.1.0&q=80&w=1080",
        results: "50K+ студентов узнают бренд",
      },
      {
        title: "Ребрендинг банка",
        description: "Комплексный ребрендинг регионального банка с обновлением всех точек контакта.",
        tags: ["Rebranding", "Financial", "Touchpoints"],
        image: "https://images.unsplash.com/photo-1748326650737-33500fdfda30?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsb2dvJTIwYnJhbmRpbmclMjBkZXNpZ258ZW58MXx8fHwxNzYyMTk2MDYzfDA&ixlib=rb-4.1.0&q=80&w=1080",
        results: "50 офисов, новый имидж",
      },
      {
        title: "Брендинг сети фитнес-клубов",
        description: "Энергичная айдентика для сети спортивных клубов с мерчем и дизайном интерьеров.",
        tags: ["Sports Branding", "Merch", "Interior"],
        image: "https://images.unsplash.com/photo-1748326650737-33500fdfda30?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsb2dvJTIwYnJhbmRpbmclMjBkZXNpZ258ZW58MXx8fHwxNzYyMTk2MDYzfDA&ixlib=rb-4.1.0&q=80&w=1080",
        results: "10 клубов, единая айдентика",
      },
      {
        title: "Брендинг агентства недвижимости",
        description: "Премиальный фирменный стиль для элитного агентства с печатными материалами.",
        tags: ["Luxury", "Print", "Real Estate"],
        image: "https://images.unsplash.com/photo-1748326650737-33500fdfda30?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsb2dvJTIwYnJhbmRpbmclMjBkZXNpZ258ZW58MXx8fHwxNzYyMTk2MDYzfDA&ixlib=rb-4.1.0&q=80&w=1080",
        results: "Сделки премиум-сегмента +40%",
      },
      {
        title: "Брендинг стартапа доставки",
        description: "Молодежная айдентика для сервиса быстрой доставки с мобильным приложением.",
        tags: ["Startup", "Youth", "App Design"],
        image: "https://images.unsplash.com/photo-1748326650737-33500fdfda30?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsb2dvJTIwYnJhbmRpbmclMjBkZXNpZ258ZW58MXx8fHwxNzYyMTk2MDYzfDA&ixlib=rb-4.1.0&q=80&w=1080",
        results: "Funding $2M после ребрендинга",
      },
      {
        title: "Брендинг консалтинговой компании",
        description: "Строгий корпоративный стиль для management консалтинга с акцентом на экспертность.",
        tags: ["Corporate", "Consulting", "Expertise"],
        image: "https://images.unsplash.com/photo-1748326650737-33500fdfda30?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsb2dvJTIwYnJhbmRpbmclMjBkZXNpZ258ZW58MXx8fHwxNzYyMTk2MDYzfDA&ixlib=rb-4.1.0&q=80&w=1080",
        results: "Клиенты из Fortune 500",
      },
    ],
  },
  designsystems: {
    title: "Дизайн-системы",
    projects: [
      {
        title: "Design System для банка",
        description: "Масштабируемая дизайн-система для экосистемы банковских продуктов с документацией.",
        tags: ["Figma", "Tokens", "Components Library", "Documentation"],
        image: "https://images.unsplash.com/photo-1618761714954-0b8cd0026356?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1aSUyMGRlc2lnbiUyMGludGVyZmFjZXxlbnwxfHx8fDE3NjIxMjQzNjN8MA&ixlib=rb-4.1.0&q=80&w=1080",
        results: "Скорость дизайна +300%",
      },
      {
        title: "UI Kit для SaaS-продукта",
        description: "Библиотека компонентов для B2B платформы с поддержкой темной темы и адаптивности.",
        tags: ["Figma", "Auto Layout", "Dark Mode", "Variants"],
        image: "https://images.unsplash.com/photo-1618761714954-0b8cd0026356?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1aSUyMGRlc2lnbiUyMGludGVyZmFjZXxlbnwxfHx8fDE3NjIxMjQzNjN8MA&ixlib=rb-4.1.0&q=80&w=1080",
        results: "4 команды используют систему",
      },
      {
        title: "Design System для маркетплейса",
        description: "Единая система дизайна для мобильного и веб-приложения торговой площадки.",
        tags: ["Figma", "Cross-platform", "Accessibility"],
        image: "https://images.unsplash.com/photo-1618761714954-0b8cd0026356?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1aSUyMGRlc2lnbiUyMGludGVyZmFjZXxlbnwxfHx8fDE3NjIxMjQzNjN8MA&ixlib=rb-4.1.0&q=80&w=1080",
        results: "Консистентность UI 100%",
      },
      {
        title: "Дизайн-система для телеком оператора",
        description: "Комплексная система дизайна для всех цифровых продуктов мобильного оператора.",
        tags: ["Figma", "Enterprise", "Multi-product"],
        image: "https://images.unsplash.com/photo-1618761714954-0b8cd0026356?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1aSUyMGRlc2lnbiUyMGludGVyZmFjZXxlbnwxfHx8fDE3NjIxMjQzNjN8MA&ixlib=rb-4.1.0&q=80&w=1080",
        results: "10+ продуктов на единой базе",
      },
      {
        title: "UI Kit для e-commerce",
        description: "Библиотека компонентов для интернет-магазинов с вариантами для разных ниш.",
        tags: ["Figma", "E-commerce", "Templates"],
        image: "https://images.unsplash.com/photo-1618761714954-0b8cd0026356?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1aSUyMGRlc2lnbiUyMGludGVyZmFjZXxlbnwxfHx8fDE3NjIxMjQzNjN8MA&ixlib=rb-4.1.0&q=80&w=1080",
        results: "Запуск магазина за 2 недели",
      },
      {
        title: "Design System для медиа",
        description: "Дизайн-система для новостного портала с компонентами для статей и видео.",
        tags: ["Figma", "Content", "Media"],
        image: "https://images.unsplash.com/photo-1618761714954-0b8cd0026356?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1aSUyMGRlc2lnbiUyMGludGVyZmFjZXxlbnwxfHx8fDE3NjIxMjQzNjN8MA&ixlib=rb-4.1.0&q=80&w=1080",
        results: "100+ шаблонов страниц",
      },
      {
        title: "Дизайн-система для образования",
        description: "UI Kit для образовательных платформ с компонентами курсов, уроков и тестов.",
        tags: ["Figma", "Education", "LMS"],
        image: "https://images.unsplash.com/photo-1618761714954-0b8cd0026356?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1aSUyMGRlc2lnbiUyMGludGVyZmFjZXxlbnwxfHx8fDE3NjIxMjQzNjN8MA&ixlib=rb-4.1.0&q=80&w=1080",
        results: "3 школы используют систему",
      },
      {
        title: "Design System для стартапа",
        description: "Гибкая дизайн-система для быстрорастущего стартапа с фокусом на масштабируемость.",
        tags: ["Figma", "Scalable", "Startup"],
        image: "https://images.unsplash.com/photo-1618761714954-0b8cd0026356?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1aSUyMGRlc2lnbiUyMGludGVyZmFjZXxlbnwxfHx8fDE3NjIxMjQzNjN8MA&ixlib=rb-4.1.0&q=80&w=1080",
        results: "От MVP до Series A на одной системе",
      },
    ],
  },
  chatbots: {
    title: "Чат-боты",
    projects: [
      {
        title: "Чат-бот поддержки e-commerce",
        description: "AI-ассистент для магазина с обработкой заказов, ответами на вопросы и интеграцией с CRM.",
        tags: ["GPT-4", "Telegram Bot", "CRM Integration", "NLP"],
        image: "https://images.unsplash.com/photo-1757310998437-b2e8a7bd2e97?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGF0Ym90JTIwYWklMjBhc3Npc3RhbnR8ZW58MXx8fHwxNzYyMTk2MDYzfDA&ixlib=rb-4.1.0&q=80&w=1080",
        results: "Обрабатывает 85% запросов автоматически",
      },
      {
        title: "Бот для HR-отдела",
        description: "Чат-бот для автоматизации подбора кандидатов с проведением первичного скрининга.",
        tags: ["Python", "AI", "Telegram", "API"],
        image: "https://images.unsplash.com/photo-1757310998437-b2e8a7bd2e97?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGF0Ym90JTIwYWklMjBhc3Npc3RhbnR8ZW58MXx8fHwxNzYyMTk2MDYzfDA&ixlib=rb-4.1.0&q=80&w=1080",
        results: "Экономия 30 часов/неделю",
      },
      {
        title: "Бот записи в салон",
        description: "Telegram-бот для автоматической записи клиентов с выбором мастера и услуги.",
        tags: ["Node.js", "Telegram", "Google Calendar"],
        image: "https://images.unsplash.com/photo-1757310998437-b2e8a7bd2e97?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGF0Ym90JTIwYWklMjBhc3Npc3RhbnR8ZW58MXx8fHwxNzYyMTk2MDYzfDA&ixlib=rb-4.1.0&q=80&w=1080",
        results: "500+ записей в месяц",
      },
      {
        title: "Чат-бот для банка",
        description: "Виртуальный ассистент для помощи клиентам банка с балансами, переводами и консультациями.",
        tags: ["GPT-4", "Banking API", "Secure"],
        image: "https://images.unsplash.com/photo-1757310998437-b2e8a7bd2e97?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGF0Ym90JTIwYWklMjBhc3Npc3RhbnR8ZW58MXx8fHwxNzYyMTk2MDYzfDA&ixlib=rb-4.1.0&q=80&w=1080",
        results: "75% вопросов решаются без оператора",
      },
      {
        title: "Бот для ресторана",
        description: "Чат-бот для приема заказов доставки, бронирования столиков и ответов на вопросы о меню.",
        tags: ["Telegram", "Menu Bot", "Booking"],
        image: "https://images.unsplash.com/photo-1757310998437-b2e8a7bd2e97?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGF0Ym90JTIwYWklMjBhc3Npc3RhbnR8ZW58MXx8fHwxNzYyMTk2MDYzfDA&ixlib=rb-4.1.0&q=80&w=1080",
        results: "40% заказов через бота",
      },
      {
        title: "Образовательный чат-бот",
        description: "AI-ассистент для онлайн-школы с ответами на вопросы студентов и напоминаниями о занятиях.",
        tags: ["GPT-4", "Education", "Reminders"],
        image: "https://images.unsplash.com/photo-1757310998437-b2e8a7bd2e97?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGF0Ym90JTIwYWklMjBhc3Npc3RhbnR8ZW58MXx8fHwxNzYyMTk2MDYzfDA&ixlib=rb-4.1.0&q=80&w=1080",
        results: "Engagement студентов +45%",
      },
      {
        title: "Бот для недвижимости",
        description: "Чат-бот для подбора квартир по параметрам с показом фото, планировок и записью на просмотр.",
        tags: ["Telegram", "Real Estate", "AI Matching"],
        image: "https://images.unsplash.com/photo-1757310998437-b2e8a7bd2e97?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGF0Ym90JTIwYWklMjBhc3Npc3RhbnR8ZW58MXx8fHwxNzYyMTk2MDYzfDA&ixlib=rb-4.1.0&q=80&w=1080",
        results: "300+ квалифицированных лидов/месяц",
      },
      {
        title: "Бот для фитнес-клуба",
        description: "Telegram-бот с расписанием занятий, записью на тренировки и трекингом прогресса.",
        tags: ["Telegram", "Fitness", "Scheduling"],
        image: "https://images.unsplash.com/photo-1757310998437-b2e8a7bd2e97?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGF0Ym90JTIwYWklMjBhc3Npc3RhbnR8ZW58MXx8fHwxNzYyMTk2MDYzfDA&ixlib=rb-4.1.0&q=80&w=1080",
        results: "70% клиентов используют бота",
      },
    ],
  },
  voiceassistants: {
    title: "Голосовые ассистенты",
    projects: [
      {
        title: "Голосовой помощник для колл-центра",
        description: "AI-ассистент для обработки входящих звонков с распознаванием речи и переводом на операторов.",
        tags: ["Voice AI", "Speech-to-Text", "NLP", "Twilio"],
        image: "https://images.unsplash.com/photo-1757310998437-b2e8a7bd2e97?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGF0Ym90JTIwYWklMjBhc3Npc3RhbnR8ZW58MXx8fHwxNzYyMTk2MDYzfDA&ixlib=rb-4.1.0&q=80&w=1080",
        results: "70% звонков без оператора",
      },
      {
        title: "Голосовой бот для записи к врачу",
        description: "Система автоматической записи пациентов через телефонные звонки с интеграцией в медицинскую систему.",
        tags: ["Voice AI", "Medical API", "ASR"],
        image: "https://images.unsplash.com/photo-1757310998437-b2e8a7bd2e97?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGF0Ym90JTIwYWklMjBhc3Npc3RhbnR8ZW58MXx8fHwxNzYyMTk2MDYzfDA&ixlib=rb-4.1.0&q=80&w=1080",
        results: "2000+ записей в месяц",
      },
      {
        title: "Голосовой помощник для доставки",
        description: "Ассистент для приема заказов по телефону и подтверждения доставки.",
        tags: ["Voice Recognition", "Order Management", "API"],
        image: "https://images.unsplash.com/photo-1757310998437-b2e8a7bd2e97?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGF0Ym90JTIwYWklMjBhc3Npc3RhbnR8ZW58MXx8fHwxNzYyMTk2MDYzfDA&ixlib=rb-4.1.0&q=80&w=1080",
        results: "Точность распознавания 95%",
      },
      {
        title: "Голосовой бот для банка",
        description: "IVR-система нового поколения для банковских операций и консультаций по телефону.",
        tags: ["Voice AI", "Banking", "IVR"],
        image: "https://images.unsplash.com/photo-1757310998437-b2e8a7bd2e97?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGF0Ym90JTIwYWklMjBhc3Npc3RhbnR8ZW58MXx8fHwxNzYyMTk2MDYzfDA&ixlib=rb-4.1.0&q=80&w=1080",
        results: "Снижение очереди на 60%",
      },
      {
        title: "Голосовой помощник для отеля",
        description: "AI-ассистент для бронирования номеров и ответов на вопросы гостей по телефону.",
        tags: ["Voice AI", "Hospitality", "Booking"],
        image: "https://images.unsplash.com/photo-1757310998437-b2e8a7bd2e97?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGF0Ym90JTIwYWklMjBhc3Npc3RhbnR8ZW58MXx8fHwxNzYyMTk2MDYzfDA&ixlib=rb-4.1.0&q=80&w=1080",
        results: "24/7 прием бронирований",
      },
      {
        title: "Голосовой бот для страховой",
        description: "Система обработки звонков по ОСАГО с оформлением полисов голосом.",
        tags: ["Voice AI", "Insurance", "Document Processing"],
        image: "https://images.unsplash.com/photo-1757310998437-b2e8a7bd2e97?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGF0Ym90JTIwYWklMjBhc3Npc3RhbnR8ZW58MXx8fHwxNzYyMTk2MDYzfDA&ixlib=rb-4.1.0&q=80&w=1080",
        results: "500+ полисов оформлено",
      },
      {
        title: "Голосовой ассистент для такси",
        description: "Система приема заказов такси по телефону с определением адреса и расчетом стоимости.",
        tags: ["Voice Recognition", "Geolocation", "Taxi"],
        image: "https://images.unsplash.com/photo-1757310998437-b2e8a7bd2e97?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGF0Ym90JTIwYWklMjBhc3Npc3RhbnR8ZW58MXx8fHwxNzYyMTk2MDYzfDA&ixlib=rb-4.1.0&q=80&w=1080",
        results: "1000+ заказов в день",
      },
      {
        title: "Голосовой помощник для ритейла",
        description: "Система обработки заказов по телефону для сети магазинов с доставкой на дом.",
        tags: ["Voice AI", "Retail", "Order Processing"],
        image: "https://images.unsplash.com/photo-1757310998437-b2e8a7bd2e97?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGF0Ym90JTIwYWklMjBhc3Npc3RhbnR8ZW58MXx8fHwxNzYyMTk2MDYzfDA&ixlib=rb-4.1.0&q=80&w=1080",
        results: "Средний чек +25%",
      },
    ],
  },
  aisupport: {
    title: "Автоматизация поддержки",
    projects: [
      {
        title: "AI-помощник для техподдержки SaaS",
        description: "Умный ассистент с базой знаний, который решает типовые проблемы пользователей.",
        tags: ["GPT-4", "Knowledge Base", "Zendesk", "Analytics"],
        image: "https://images.unsplash.com/photo-1757310998437-b2e8a7bd2e97?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGF0Ym90JTIwYWklMjBhc3Npc3RhbnR8ZW58MXx8fHwxNzYyMTk2MDYzfDA&ixlib=rb-4.1.0&q=80&w=1080",
        results: "Снижение нагрузки на 60%",
      },
      {
        title: "Автоматическая система тикетов",
        description: "AI для автоматической категоризации и распределения обращений в службу поддержки.",
        tags: ["Machine Learning", "Classification", "API"],
        image: "https://images.unsplash.com/photo-1757310998437-b2e8a7bd2e97?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGF0Ym90JTIwYWklMjBhc3Npc3RhbnR8ZW58MXx8fHwxNzYyMTk2MDYzfDA&ixlib=rb-4.1.0&q=80&w=1080",
        results: "Время обработки -50%",
      },
      {
        title: "Чат-бот для FAQ",
        description: "Интеллектуальный бот с ответами на частые вопросы для сайта компании.",
        tags: ["NLP", "ChatGPT", "Web Integration"],
        image: "https://images.unsplash.com/photo-1757310998437-b2e8a7bd2e97?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGF0Ym90JTIwYWklMjBhc3Npc3RhbnR8ZW58MXx8fHwxNzYyMTk2MDYzfDA&ixlib=rb-4.1.0&q=80&w=1080",
        results: "92% точность ответов",
      },
      {
        title: "Система самообслуживания для телеком",
        description: "AI-платформа для автоматического решения проблем абонентов без участия операторов.",
        tags: ["Self-service", "AI", "Telecom"],
        image: "https://images.unsplash.com/photo-1757310998437-b2e8a7bd2e97?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGF0Ym90JTIwYWklMjBhc3Npc3RhbnR8ZW58MXx8fHwxNzYyMTk2MDYzfDA&ixlib=rb-4.1.0&q=80&w=1080",
        results: "Разгрузка call-центра на 70%",
      },
      {
        title: "AI для e-commerce поддержки",
        description: "Интеллектуальный ассистент для обработки вопросов покупателей о заказах и доставке.",
        tags: ["GPT-4", "E-commerce", "Order Tracking"],
        image: "https://images.unsplash.com/photo-1757310998437-b2e8a7bd2e97?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGF0Ym90JTIwYWklMjBhc3Npc3RhbnR8ZW58MXx8fHwxNzYyMTk2MDYzfDA&ixlib=rb-4.1.0&q=80&w=1080",
        results: "CSAT вырос до 4.7/5",
      },
      {
        title: "Автоматизация IT-поддержки",
        description: "Система автоматического решения технических проблем сотрудников компании.",
        tags: ["IT Support", "Automation", "Tickets"],
        image: "https://images.unsplash.com/photo-1757310998437-b2e8a7bd2e97?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGF0Ym90JTIwYWklMjBhc3Npc3RhbnR8ZW58MXx8fHwxNzYyMTk2MDYzfDA&ixlib=rb-4.1.0&q=80&w=1080",
        results: "80% инцидентов решается автоматически",
      },
      {
        title: "Мультиязычная поддержка для маркетплейса",
        description: "AI-ассистент с поддержкой 15 языков для международной торговой платформы.",
        tags: ["Multilingual", "GPT-4", "Translation"],
        image: "https://images.unsplash.com/photo-1757310998437-b2e8a7bd2e97?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGF0Ym90JTIwYWklMjBhc3Npc3RhbnR8ZW58MXx8fHwxNzYyMTk2MDYzfDA&ixlib=rb-4.1.0&q=80&w=1080",
        results: "Поддержка 50+ стран",
      },
      {
        title: "AI для финансовой поддержки",
        description: "Умный помощник для ответов на вопросы клиентов банка о продуктах и услугах.",
        tags: ["GPT-4", "Banking", "Compliance"],
        image: "https://images.unsplash.com/photo-1757310998437-b2e8a7bd2e97?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGF0Ym90JTIwYWklMjBhc3Npc3RhbnR8ZW58MXx8fHwxNzYyMTk2MDYzfDA&ixlib=rb-4.1.0&q=80&w=1080",
        results: "Compliance 100%, автоматизация 65%",
      },
    ],
  },
  crm: {
    title: "CRM системы",
    projects: [
      {
        title: "CRM для автодилера",
        description: "Система управления продажами автомобилей с воронкой, планировщиком тест-драйвов и аналитикой.",
        tags: ["Custom CRM", "React", "Node.js", "Analytics"],
        image: "https://images.unsplash.com/photo-1758626099012-2904337e9c60?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGF1dG9tYXRpb24lMjBzb2Z0d2FyZXxlbnwxfHx8fDE3NjIxOTYwNjN8MA&ixlib=rb-4.1.0&q=80&w=1080",
        results: "Конверсия в продажу +35%",
      },
      {
        title: "CRM для агентства недвижимости",
        description: "Платформа для управления сделками, клиентами и объектами недвижимости.",
        tags: ["CRM", "Real Estate", "Document Flow"],
        image: "https://images.unsplash.com/photo-1758626099012-2904337e9c60?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGF1dG9tYXRpb24lMjBzb2Z0d2FyZXxlbnwxfHx8fDE3NjIxOTYwNjN8MA&ixlib=rb-4.1.0&q=80&w=1080",
        results: "Управление 1000+ объектами",
      },
      {
        title: "CRM для образовательного центра",
        description: "Система учета студентов, расписания, оплат и коммуникации с родителями.",
        tags: ["Education CRM", "Schedule", "Payments"],
        image: "https://images.unsplash.com/photo-1758626099012-2904337e9c60?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGF1dG9tYXRpb24lMjBzb2Z0d2FyZXxlbnwxfHx8fDE3NjIxOTYwNjN8MA&ixlib=rb-4.1.0&q=80&w=1080",
        results: "500+ студентов в системе",
      },
      {
        title: "CRM для медицинской клиники",
        description: "Система управления пациентами, записями, медицинскими картами и финансами клиники.",
        tags: ["Medical CRM", "EMR", "Appointments"],
        image: "https://images.unsplash.com/photo-1758626099012-2904337e9c60?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGF1dG9tYXRpb24lMjBzb2Z0d2FyZXxlbnwxfHx8fDE3NjIxOTYwNjN8MA&ixlib=rb-4.1.0&q=80&w=1080",
        results: "3000+ пациентов, 5 филиалов",
      },
      {
        title: "CRM для юридической фирмы",
        description: "Система управления делами, клиентами, документами и учетом рабочего времени юристов.",
        tags: ["Legal CRM", "Case Management", "Time Tracking"],
        image: "https://images.unsplash.com/photo-1758626099012-2904337e9c60?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGF1dG9tYXRpb24lMjBzb2Z0d2FyZXxlbnwxfHx8fDE3NjIxOTYwNjN8MA&ixlib=rb-4.1.0&q=80&w=1080",
        results: "200+ дел в работе",
      },
      {
        title: "CRM для туристического агентства",
        description: "Платформа для управления турами, клиентами, бронированиями и комиссиями партнеров.",
        tags: ["Travel CRM", "Booking", "Commission"],
        image: "https://images.unsplash.com/photo-1758626099012-2904337e9c60?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGF1dG9tYXRpb24lMjBzb2Z0d2FyZXxlbnwxfHx8fDE3NjIxOTYwNjN8MA&ixlib=rb-4.1.0&q=80&w=1080",
        results: "₽50M оборот через систему",
      },
      {
        title: "CRM для ресторанной сети",
        description: "Система управления клиентами с программой лояльности, бронированиями и маркетингом.",
        tags: ["Restaurant CRM", "Loyalty", "Marketing"],
        image: "https://images.unsplash.com/photo-1758626099012-2904337e9c60?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGF1dG9tYXRpb24lMjBzb2Z0d2FyZXxlbnwxfHx8fDE3NjIxOTYwNjN8MA&ixlib=rb-4.1.0&q=80&w=1080",
        results: "20000+ гостей в базе",
      },
      {
        title: "CRM для строительной компании",
        description: "Система управления проектами, подрядчиками, закупками и сметами.",
        tags: ["Construction CRM", "Project Management", "Budgeting"],
        image: "https://images.unsplash.com/photo-1758626099012-2904337e9c60?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGF1dG9tYXRpb24lMjBzb2Z0d2FyZXxlbnwxfHx8fDE3NjIxOTYwNjN8MA&ixlib=rb-4.1.0&q=80&w=1080",
        results: "15 объектов в параллели",
      },
    ],
  },
  emailmarketing: {
    title: "Email-маркетинг",
    projects: [
      {
        title: "Автоматизация email-кампаний",
        description: "Настройка триггерных цепочек писем для e-commerce с персонализацией и A/B тестированием.",
        tags: ["Mailchimp", "Automation", "Segmentation", "Analytics"],
        image: "https://images.unsplash.com/photo-1758626099012-2904337e9c60?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGF1dG9tYXRpb24lMjBzb2Z0d2FyZXxlbnwxfHx8fDE3NjIxOTYwNjN8MA&ixlib=rb-4.1.0&q=80&w=1080",
        results: "Open rate 45%, CTR 12%",
      },
      {
        title: "Email-рассылки для медиа",
        description: "Система дайджестов и newsletter для новостного портала с автоматической генерацией контента.",
        tags: ["SendGrid", "Content Automation", "RSS"],
        image: "https://images.unsplash.com/photo-1758626099012-2904337e9c60?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGF1dG9tYXRpb24lMjBzb2Z0d2FyZXxlbnwxfHx8fDE3NjIxOTYwNjN8MA&ixlib=rb-4.1.0&q=80&w=1080",
        results: "50K подписчиков, engagement 38%",
      },
      {
        title: "Retention email-система",
        description: "Цепочки писем для возврата неактивных пользователей SaaS-продукта.",
        tags: ["Retention", "Customer Success", "Email Design"],
        image: "https://images.unsplash.com/photo-1758626099012-2904337e9c60?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGF1dG9tYXRpb24lMjBzb2Z0d2FyZXxlbnwxfHx8fDE3NjIxOTYwNjN8MA&ixlib=rb-4.1.0&q=80&w=1080",
        results: "Возврат 23% пользователей",
      },
      {
        title: "Welcome-серия для онбординга",
        description: "Серия приветственных писем для новых пользователей с обучением продукту.",
        tags: ["Onboarding", "Welcome Series", "Education"],
        image: "https://images.unsplash.com/photo-1758626099012-2904337e9c60?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGF1dG9tYXRpb24lMjBzb2Z0d2FyZXxlbnwxfHx8fDE3NjIxOTYwNjN8MA&ixlib=rb-4.1.0&q=80&w=1080",
        results: "Activation rate +55%",
      },
      {
        title: "Email-кампании для B2B",
        description: "Nurturing цепочки для прогрева B2B-лидов с кейсами и полезным контентом.",
        tags: ["B2B", "Lead Nurturing", "Case Studies"],
        image: "https://images.unsplash.com/photo-1758626099012-2904337e9c60?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGF1dG9tYXRpb24lMjBzb2Z0d2FyZXxlbnwxfHx8fDE3NjIxOTYwNjN8MA&ixlib=rb-4.1.0&q=80&w=1080",
        results: "Lead-to-customer +40%",
      },
      {
        title: "Транзакционные email для e-commerce",
        description: "Дизайн и настройка транзакционных писем: подтверждения заказов, отправки, отзывы.",
        tags: ["Transactional", "E-commerce", "Design"],
        image: "https://images.unsplash.com/photo-1758626099012-2904337e9c60?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGF1dG9tYXRpb24lMjBzb2Z0d2FyZXxlbnwxfHx8fDE3NjIxOTYwNjN8MA&ixlib=rb-4.1.0&q=80&w=1080",
        results: "Repeat purchase rate +30%",
      },
      {
        title: "Email для событийного маркетинга",
        description: "Автоматизация рассылок для конференций: приглашения, напоминания, follow-up.",
        tags: ["Events", "Conference", "Follow-up"],
        image: "https://images.unsplash.com/photo-1758626099012-2904337e9c60?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGF1dG9tYXRpb24lMjBzb2Z0d2FyZXxlbnwxfHx8fDE3NjIxOTYwNjN8MA&ixlib=rb-4.1.0&q=80&w=1080",
        results: "Attendance rate 78%",
      },
      {
        title: "Сегментированные кампании для ритейла",
        description: "Персонализированные рассылки на основе истории покупок и поведения клиентов.",
        tags: ["Segmentation", "Personalization", "Retail"],
        image: "https://images.unsplash.com/photo-1758626099012-2904337e9c60?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGF1dG9tYXRpb24lMjBzb2Z0d2FyZXxlbnwxfHx8fDE3NjIxOTYwNjN8MA&ixlib=rb-4.1.0&q=80&w=1080",
        results: "ROI 3800%",
      },
    ],
  },
  integrations: {
    title: "Интеграции",
    projects: [
      {
        title: "Интеграция CRM и 1С",
        description: "Двухсторонняя синхронизация данных между CRM и 1С с обработкой заказов и оплат.",
        tags: ["1C", "API", "Sync", "Webhooks"],
        image: "https://images.unsplash.com/photo-1758626099012-2904337e9c60?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGF1dG9tYXRpb24lMjBzb2Z0d2FyZXxlbnwxfHx8fDE3NjIxOTYwNjN8MA&ixlib=rb-4.1.0&q=80&w=1080",
        results: "Автоматизация 100% заказов",
      },
      {
        title: "Интеграция платежных систем",
        description: "Подключение Stripe, PayPal, ЮKassa для интернет-магазина с единым интерфейсом.",
        tags: ["Payments", "Stripe", "PayPal", "API"],
        image: "https://images.unsplash.com/photo-1758626099012-2904337e9c60?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGF1dG9tYXRpb24lMjBzb2Z0d2FyZXxlbnwxfHx8fDE3NjIxOTYwNjN8MA&ixlib=rb-4.1.0&q=80&w=1080",
        results: "3 платежных метода, 99.9% uptime",
      },
      {
        title: "Интеграция с соцсетями",
        description: "Автоматическая публикация контента на все социальные платформы через единую панель.",
        tags: ["Social Media", "Automation", "API", "Content"],
        image: "https://images.unsplash.com/photo-1758626099012-2904337e9c60?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGF1dG9tYXRpb24lMjBzb2Z0d2FyZXxlbnwxfHx8fDE3NjIxOTYwNjN8MA&ixlib=rb-4.1.0&q=80&w=1080",
        results: "5 платформ, экономия 10 ч/неделю",
      },
      {
        title: "Интеграция с доставками",
        description: "Подключение СДЭК, Boxberry, Почта России для автоматического расчета стоимости и трекера.",
        tags: ["Delivery", "CDEK", "Tracking", "API"],
        image: "https://images.unsplash.com/photo-1758626099012-2904337e9c60?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGF1dG9tYXRpb24lMjBzb2Z0d2FyZXxlbnwxfHx8fDE3NjIxOTYwNjN8MA&ixlib=rb-4.1.0&q=80&w=1080",
        results: "Автоматизация логистики 100%",
      },
      {
        title: "Интеграция с Wildberries и Ozon",
        description: "Синхронизация каталога, остатков и заказов с маркетплейсами.",
        tags: ["Marketplaces", "WB", "Ozon", "Sync"],
        image: "https://images.unsplash.com/photo-1758626099012-2904337e9c60?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGF1dG9tYXRpb24lMjBzb2Z0d2FyZXxlbnwxfHx8fDE3NjIxOTYwNjN8MA&ixlib=rb-4.1.0&q=80&w=1080",
        results: "Продажи на маркетплейсах +250%",
      },
      {
        title: "Интеграция с Яндекс.Метрикой и Google Analytics",
        description: "Настройка сквозной аналитики с передачей данных в CRM и рекламные кабинеты.",
        tags: ["Analytics", "Yandex", "Google", "Attribution"],
        image: "https://images.unsplash.com/photo-1758626099012-2904337e9c60?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGF1dG9tYXRpb24lMjBzb2Z0d2FyZXxlbnwxfHx8fDE3NjIxOTYwNjN8MA&ixlib=rb-4.1.0&q=80&w=1080",
        results: "Точность атрибуции 95%",
      },
      {
        title: "Интеграция с AmoCRM",
        description: "Настройка воронок продаж, интеграция с сайтом, мессенджерами и телефонией.",
        tags: ["AmoCRM", "Sales Funnel", "Telephony"],
        image: "https://images.unsplash.com/photo-1758626099012-2904337e9c60?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGF1dG9tYXRpb24lMjBzb2Z0d2FyZXxlbnwxfHx8fDE3NjIxOTYwNjN8MA&ixlib=rb-4.1.0&q=80&w=1080",
        results: "Конверсия лидов +45%",
      },
      {
        title: "Интеграция с Zapier",
        description: "Настройка автоматизаций между сервисами без программирования через Zapier.",
        tags: ["Zapier", "No-code", "Automation", "Workflows"],
        image: "https://images.unsplash.com/photo-1758626099012-2904337e9c60?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGF1dG9tYXRpb24lMjBzb2Z0d2FyZXxlbnwxfHx8fDE3NjIxOTYwNjN8MA&ixlib=rb-4.1.0&q=80&w=1080",
        results: "50+ автоматизированных процессов",
      },
    ],
  },
  analytics: {
    title: "Аналитика",
    projects: [
      {
        title: "Дашборд бизнес-аналитики",
        description: "Настройка комплексной системы аналитики с визуализацией KPI и прогнозированием.",
        tags: ["Google Analytics", "Data Studio", "Power BI"],
        image: "https://images.unsplash.com/photo-1758626099012-2904337e9c60?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGF1dG9tYXRpb24lMjBzb2Z0d2FyZXxlbnwxfHx8fDE3NjIxOTYwNjN8MA&ixlib=rb-4.1.0&q=80&w=1080",
        results: "20+ метрик в реальном времени",
      },
      {
        title: "Аналитика e-commerce",
        description: "Настройка отслеживания всей воронки продаж с когортным анализом и RFM-сегментацией.",
        tags: ["E-commerce Analytics", "Cohort Analysis", "Segmentation"],
        image: "https://images.unsplash.com/photo-1758626099012-2904337e9c60?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGF1dG9tYXRpb24lMjBzb2Z0d2FyZXxlbnwxfHx8fDE3NjIxOTYwNjN8MA&ixlib=rb-4.1.0&q=80&w=1080",
        results: "Рост конверсии на 28%",
      },
      {
        title: "Система отчетности для CEO",
        description: "Автоматические отчеты с ключевыми метриками бизнеса, отправляемые на email.",
        tags: ["Reporting", "Automation", "Executive Dashboard"],
        image: "https://images.unsplash.com/photo-1758626099012-2904337e9c60?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGF1dG9tYXRpb24lMjBzb2Z0d2FyZXxlbnwxfHx8fDE3NjIxOTYwNjN8MA&ixlib=rb-4.1.0&q=80&w=1080",
        results: "Ежедневные отчеты по 15 метрикам",
      },
      {
        title: "Продуктовая аналитика",
        description: "Внедрение системы аналитики пользовательского поведения в SaaS-продукте.",
        tags: ["Product Analytics", "User Behavior", "Mixpanel"],
        image: "https://images.unsplash.com/photo-1758626099012-2904337e9c60?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGF1dG9tYXRpb24lMjBzb2Z0d2FyZXxlbnwxfHx8fDE3NjIxOTYwNjN8MA&ixlib=rb-4.1.0&q=80&w=1080",
        results: "Retention вырос на 35%",
      },
      {
        title: "Маркетинговая аналитика",
        description: "Сквозная аналитика всех рекламных каналов с расчетом ROI и ROAS.",
        tags: ["Marketing Analytics", "ROI", "Multi-touch Attribution"],
        image: "https://images.unsplash.com/photo-1758626099012-2904337e9c60?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGF1dG9tYXRpb24lMjBzb2Z0d2FyZXxlbnwxfHx8fDE3NjIxOTYwNjN8MA&ixlib=rb-4.1.0&q=80&w=1080",
        results: "Оптимизация бюджета: -30% затрат при +20% лидов",
      },
      {
        title: "Аналитика мобильного приложения",
        description: "Настройка трекинга событий, воронок и push-уведомлений для мобильного приложения.",
        tags: ["Mobile Analytics", "Firebase", "Events"],
        image: "https://images.unsplash.com/photo-1758626099012-2904337e9c60?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGF1dG9tYXRpb24lMjBzb2Z0d2FyZXxlbnwxfHx8fDE3NjIxOTYwNjN8MA&ixlib=rb-4.1.0&q=80&w=1080",
        results: "DAU/MAU ratio улучшился до 45%",
      },
      {
        title: "Финансовая аналитика",
        description: "Дашборд финансовых показателей: выручка, расходы, прибыль, Unit Economics.",
        tags: ["Financial", "Unit Economics", "P&L"],
        image: "https://images.unsplash.com/photo-1758626099012-2904337e9c60?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGF1dG9tYXRpb24lMjBzb2Z0d2FyZXxlbnwxfHx8fDE3NjIxOTYwNjN8MA&ixlib=rb-4.1.0&q=80&w=1080",
        results: "Прозрачность финансов в реальном времени",
      },
      {
        title: "A/B тестирование и эксперименты",
        description: "Внедрение платформы для проведения A/B тестов на сайте и в продукте.",
        tags: ["A/B Testing", "Experiments", "Optimization"],
        image: "https://images.unsplash.com/photo-1758626099012-2904337e9c60?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGF1dG9tYXRpb24lMjBzb2Z0d2FyZXxlbnwxfHx8fDE3NjIxOTYwNjN8MA&ixlib=rb-4.1.0&q=80&w=1080",
        results: "50+ успешных экспериментов",
      },
    ],
  },
};

type PortfolioProps = {
  category: string;
  onBack: () => void;
  onProjectClick: (category: string, index: number) => void;
};

export function Portfolio({ category, onBack, onProjectClick }: PortfolioProps) {
  const data = portfolioData[category];
  const [visibleCount, setVisibleCount] = useState(6);

  if (!data) return null;

  const visibleProjects = data.projects.slice(0, visibleCount);
  const hasMore = visibleCount < data.projects.length;

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 4);
  };

  return (
    <div className="min-h-screen bg-background pt-24 px-6 lg:px-8 pb-20">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors duration-300 mb-8 group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            Вернуться назад
          </button>

          <h1 style={{ fontSize: '3.5rem', lineHeight: '1.2', letterSpacing: '-0.02em' }} className="text-foreground mb-4">
            {data.title}
          </h1>
          <p className="text-muted-foreground max-w-2xl">
            Реализованные проекты в категории «{data.title}»
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {visibleProjects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              onClick={() => onProjectClick(category, index)}
              className="group rounded-2xl border border-border bg-background/50 backdrop-blur-sm hover:border-accent/50 transition-all duration-300 overflow-hidden cursor-pointer"
            >
              {/* Image */}
              <div className="relative h-64 overflow-hidden bg-secondary/20">
                <ImageWithFallback
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-60" />
              </div>

              {/* Content */}
              <div className="p-8">
                <div className="flex items-start justify-between mb-4">
                  <h3 style={{ fontSize: '1.5rem' }} className="text-foreground flex-1">
                    {project.title}
                  </h3>
                  <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-accent group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300 flex-shrink-0 ml-3" />
                </div>

                <p className="text-muted-foreground mb-4">
                  {project.description}
                </p>

                {project.results && (
                  <div className="mb-4 px-4 py-2 rounded-lg bg-accent/10 border border-accent/20">
                    <p className="text-accent">
                      {project.results}
                    </p>
                  </div>
                )}

                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full border border-border bg-secondary/50 text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Load More Button */}
        {hasMore && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex justify-center mt-12"
          >
            <motion.button
              onClick={handleLoadMore}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-4 bg-accent text-accent-foreground rounded-full transition-all duration-300 hover:shadow-[0_0_20px_rgba(99,102,241,0.3)]"
            >
              Загрузить еще
            </motion.button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
