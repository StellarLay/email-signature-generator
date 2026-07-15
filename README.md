# Email Signature Studio

Генератор корпоративной email-подписи Reputation House на React, Vite и Chakra UI.

## Запуск

```bash
npm install
npm run dev
```

## Проверки

```bash
npm run lint
npm run build
```

Кнопка «Скопировать подпись» записывает в буфер обмена HTML и текстовую версию одновременно. Табличная разметка и inline-стили внутри подписи сохранены намеренно для совместимости с Gmail и Outlook.

## Email-ассеты

Иконки в подписи используются как PNG по абсолютным URL развёрнутого приложения: почтовые редакторы часто удаляют inline SVG. Чтобы пересобрать иконки FontAwesome и декоративную фигуру из исходного SVG:

```bash
npm run assets:email -- /absolute/path/to/shape.svg
```

Команда сохраняет обрезанный SVG и готовые PNG в `public/email-assets`.
