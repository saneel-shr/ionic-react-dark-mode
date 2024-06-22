import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonItem, IonIcon, IonLabel, IonToggle } from '@ionic/react';
import './Home.css';
import { useTheme } from "ionic-react-dark-mode";

const Home: React.FC = () => {
  const  { isDarkMode, toggleDarkMode } = useTheme();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Toggle {isDarkMode ? 'Dark' : 'Light'} Mode</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Switching Dark/Light mode example</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonItem
          detail={false}
          routerDirection="none"
          className={"not-selected non-selectable"}
          lines="none"
        >
          <IonLabel className="gray-text">{isDarkMode ? 'Dark' : 'Light'} Mode</IonLabel>
          <IonToggle
            className=""
            slot="end"
            checked={isDarkMode}
            onIonChange={toggleDarkMode}
          />
        </IonItem>
      </IonContent>
    </IonPage>
  );
};

export default Home;