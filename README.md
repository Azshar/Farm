[//]: # (This is a new [**React Native**]&#40;https://reactnative.dev&#41; project, bootstrapped using [`@react-native-community/cli`]&#40;https://github.com/react-native-community/cli&#41;.)

[//]: # (# Getting Started)

[//]: # (>**Note**: Make sure you have completed the [React Native - Environment Setup]&#40;https://reactnative.dev/docs/environment-setup&#41; instructions till "Creating a new application" step, before proceeding.)

## Тестовое задание:

1. Использовать Expo;
2. Использовать сервис с API для загрузки списка новостей https://newsapi.org/;
3. При загрузке статей по API придерживаться следующих правил:
   - статьи за неделю;
   - сортировка по популярности;
   - фильтр по определенной теме, например, криптовалюты;
4. Реализовать 2 экрана приложения:
   - на первом экране список новостей с изображением, описанием и кнопкой перехода на экран новости;
   - на втором экране сама новость в компоненте WebView, предусмотреть возможность вернуться к списку новостей;

## Шаг 1: Развертывание проекта
```bash
npm install

npx rnn-link

npm run ios-install
```

### Если rnn-link отрабатывает с ошибкой:
В файле node_modules/react-native-navigation/autolink/postlink.path.js заменить:
```bash
var mainApplicationJava = glob.sync('**/MainApplication.java', ignoreFolders)[0];

var mainApplicationJava = glob.sync('**/MainApplication.{java,kt}', ignoreFolders)[0];
```
Это связано с тем, что библиотека работает все еще с Java-кодом.

### Если ошибка (Execution failed for task ':react-native-navigation:compileReactNative71DebugKotlin'.)
В файле node_modules/react-native-navigation/lib/android/app/build.gradle:
```bash
android {
    compileOptions {
        sourceCompatibility JavaVersion.VERSION_17
        targetCompatibility JavaVersion.VERSION_17
    }
    kotlinOptions {
        jvmTarget = JavaVersion.VERSION_17
    }
}
```

## API-Ключи
Необходимо задать свой API-ключ в файле .env, либо использовать тестовый: 
```bash
API_KEY=25b27733bda8482cbd3c184cfcdf4f0d
```
