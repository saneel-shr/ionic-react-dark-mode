# ionic-react-dark-mode
A React Hook and Context implementation for managing dark mode in Ionic React applications using Capacitor Preferences.

To install the package, use the following command:

```sh
npm install ionic-react-dark-mode
```

## Usage
## Step 1: Prepare Light Mode and Dark Mode Colors
Create or update the src/theme/variables.css file with the following content:

```
:root {
  /* Light mode colors */
  --ion-color-primary-light: #008000;

  /* Dark mode colors */
  --ion-color-primary-dark: #222428;
}

body {
  --ion-color-primary: var(--ion-color-primary-light);
}

body.dark {
  --ion-color-primary: var(--ion-color-primary-dark);
}
```

## Step 2: Apply Colors to Ionic Elements
To reflect color changes in dark mode and light mode, add color="primary" to your Ionic elements. For example:
```
import React from 'react';
import {
  IonApp,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonMenu,
  IonMenuToggle,
  IonList,
  IonItem,
  IonLabel,
  IonPage,
  IonSplitPane,
} from '@ionic/react';
import { ThemeProvider, useTheme } from 'ionic-react-dark-mode';

const Menu: React.FC = () => (
  <IonMenu contentId="main-content">
    <IonHeader>
      <IonToolbar>
        <IonTitle>Menu</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent>
      <IonList>
        <IonMenuToggle autoHide={false}>
          <IonItem button>
            <IonLabel>Home</IonLabel>
          </IonItem>
        </IonMenuToggle>
        {/* Add more menu items here */}
      </IonList>
    </IonContent>
  </IonMenu>
);

const MainContent: React.FC = () => {
  const { isDarkMode, toggleDarkMode } = useTheme();

  return (
    <IonPage id="main-content">
      <IonHeader>
        <IonToolbar color="primary">
          <IonMenuToggle slot="start">
            <IonButton>Menu</IonButton>
          </IonMenuToggle>
          <IonTitle>Dark Mode Example</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonButton onClick={toggleDarkMode}>
          {isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

const App: React.FC = () => (
  <IonApp>
    <IonSplitPane contentId="main-content">
      <Menu />
      <MainContent />
    </IonSplitPane>
  </IonApp>
);

const AppWrapper: React.FC = () => (
  <ThemeProvider>
    <App />
  </ThemeProvider>
);

export default AppWrapper;

```
## Example Project
An example project demonstrating the usage of this package can be found in the examples/sample directory of this repository. The example includes:

* Setting up light and dark mode colors in variables.css.
* Applying these colors to Ionic components using the color="primary" attribute.
* Toggling between light and dark modes using the useTheme hook.

Clone the repository and run below commands:
```
cd examples/sample
ionic serve
``````

**Note:** By default, the package do not check if the browser supports **window.matchMedia** and whether the user prefers a dark color scheme.
To enable check pass the **checkMatchMediaSupport={true}** props in ThemeProvider like below:
```
<ThemeProvider checkMatchMediaSupport={true}>
.....
</ThemeProvider>
```