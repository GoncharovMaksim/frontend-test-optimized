"use client";

import React from 'react';
import { ImageWithFallback } from './ImageWithFallback';

interface AdaptivePortfolioImageProps {
  src: string;
  alt: string;
  className?: string;
  isCard?: boolean; // Для использования в карточках портфолио
}

/**
 * Адаптивный компонент для отображения portfolio-default.png
 * Сохраняет пропорции, тень и корректно отображается на всех устройствах
 */
export function AdaptivePortfolioImage({ 
  src, 
  alt, 
  className = "",
  isCard = false 
}: AdaptivePortfolioImageProps) {
  // Проверяем, является ли это portfolio-default.png
  const isPortfolioDefault = src === "/portfolio-default.png" || src.includes("portfolio-default.png");

  if (!isPortfolioDefault) {
    // Для других изображений используем стандартный компонент
    return (
      <ImageWithFallback
        src={src}
        alt={alt}
        className={className}
      />
    );
  }

  // Для карточек портфолио - компактный вариант
  if (isCard) {
    return (
      <div className="relative w-full h-full">
        {/* Тень для карточки */}
        <div 
          className="absolute inset-0"
          style={{
            boxShadow: 'inset 0 0 0 1px rgba(255, 255, 255, 0.05), 0 4px 12px -2px rgba(0, 0, 0, 0.2)',
            zIndex: 0,
            borderRadius: '0.5rem',
          }}
        />
        
        {/* Изображение с адаптивными размерами для карточки */}
        <div className="relative w-full h-full overflow-hidden">
          <ImageWithFallback
            src={src}
            alt={alt}
            className={`w-full h-full ${className}`}
            style={{
              objectFit: 'cover', // Для карточек используем cover
              objectPosition: 'center',
            }}
          />
        </div>
      </div>
    );
  }

  // Для детальной страницы проекта - полный вариант с тенью
  return (
    <div className="relative w-full">
      {/* Контейнер с сохранением пропорций и тенью */}
      <div 
        className="relative w-full"
        style={{
          aspectRatio: '16 / 9', // Сохраняем пропорции
          maxHeight: '500px', // Максимальная высота на десктопе
        }}
      >
        {/* Тень - используем box-shadow для сохранения на всех устройствах */}
        <div 
          className="absolute inset-0 rounded-2xl"
          style={{
            boxShadow: '0 20px 60px -15px rgba(0, 0, 0, 0.3), 0 10px 30px -10px rgba(0, 0, 0, 0.2)',
            zIndex: 0,
          }}
        />
        
        {/* Изображение с адаптивными размерами */}
        <div className="relative w-full h-full rounded-2xl overflow-hidden bg-secondary/10">
          <ImageWithFallback
            src={src}
            alt={alt}
            className={`w-full h-full ${className}`}
            style={{
              objectFit: 'contain', // Сохраняем пропорции без обрезки
              objectPosition: 'center',
            }}
          />
        </div>
      </div>
    </div>
  );
}

