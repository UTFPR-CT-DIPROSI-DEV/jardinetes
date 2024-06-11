import React, { useEffect, useState } from 'react';
import { View, ScrollView, Image, TouchableOpacity, Text, ActivityIndicator, Dimensions } from 'react-native';
import { styles } from '../AnaliseFinal/styles';
import { useNavigation, useRoute } from '@react-navigation/native';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { userSearchData } from '../../../functions';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient'; // Import LinearGradient

export default function AnaliseFinal() {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [initialLoading, setInitialLoading] = useState(true); // Novo estado para a tela de carregamento inicial
  const [userInfo, setUserInfo] = useState(false);
  const [documentData, setDocumentData] = useState(null); // Estado para armazenar dados do documento
  const auth = getAuth();
  const firestore = getFirestore();
  const storage = getStorage();
  const [userName, setUserName] = useState('');
  const [wallpaper, setWallpaper] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [email, setEmail] = useState('');
  const [pracasSeguidas, setPracasSeguidas] = useState([]);
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const route = useRoute();
  const novoJardineteDocId = route.params.novoJardineteDocId;
  const { width, height } = Dimensions.get('window');
  const [petalaImage, setPetalaImage] = useState(require('../../assets/petala20.png'));
  const [petalaStyle, setPetalaStyle] = useState(styles.petala200);
  const [bemEstarPetalaImage, setBemEstarPetalaImage] = useState(require('../../assets/petala20.png'));
  const [bemEstarPetalaStyle, setBemEstarPetalaStyle] = useState(styles.petala201);
  const [petalaImage1, setPetalaImage1] = useState(require('../../assets/petala20.png'));
  const [petalaStyle1, setPetalaStyle1] = useState(styles.petala203);
  const [petalaImage2, setPetalaImage2] = useState(require('../../assets/petala20.png'));
  const [petalaStyle2, setPetalaStyle2] = useState(styles.petala203);

  useEffect(() => {
    const unsubscribe = userSearchData(auth, firestore, storage, navigation, setUserName, setWallpaper, setImageUrl, setEmail, setPracasSeguidas);

    async function fetchData() {
      try {
        const docRef = doc(firestore, 'jardinetes', novoJardineteDocId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          console.log("Document data:", data); // Log completo dos dados do documento
          setDocumentData(data); // Armazenar dados do documento no estado

          const pessoas = data.pessoas;

          if (
            data.infraestrutura_01 !== undefined &&
            data.infraestrutura_02 !== undefined &&
            data.infraestrutura_03 !== undefined &&
            data.infraestrutura_04 !== undefined &&
            data.infraestrutura_05 !== undefined &&
            pessoas !== undefined &&
            data.bem_estar_01 !== undefined &&
            data.bem_estar_02 !== undefined &&
            data.bem_estar_03 !== undefined &&
            data.bem_estar_04 !== undefined &&
            data.bem_estar_05 !== undefined &&
            data.pertencimento_01 !== undefined &&
            data.pertencimento_02 !== undefined &&
            data.pertencimento_03 !== undefined &&
            data.pertencimento_04 !== undefined &&
            data.pertencimento_05 !== undefined &&
            data.seguranca_01 !== undefined &&
            data.seguranca_02 !== undefined &&
            data.seguranca_03 !== undefined &&
            data.seguranca_04 !== undefined &&
            data.seguranca_05 !== undefined 
          ) {
            // Calcular média para infraestrutura ajustada pela quantidade de pessoas
            const infraSum = data.infraestrutura_01 + data.infraestrutura_02 + data.infraestrutura_03 + data.infraestrutura_04 + data.infraestrutura_05;
            const infraAverage = (((infraSum / 5) / pessoas) * 20);
            console.log("infraAverage:", infraAverage);

            if (infraAverage <= 30) {
              setPetalaImage(require('../../assets/petala20.png'));
              setPetalaStyle(styles.petala200);
            } else if (infraAverage > 30 && infraAverage <= 50) {
              setPetalaImage(require('../../assets/petala40.png'));
              setPetalaStyle(styles.petala400);
            } else if (infraAverage > 50 && infraAverage <= 70) {
              setPetalaImage(require('../../assets/petala60.png'));
              setPetalaStyle(styles.petala600);
            } else if (infraAverage > 70 && infraAverage <= 90) {
              setPetalaImage(require('../../assets/petala80.png'));
              setPetalaStyle(styles.petala800);
            } else if (infraAverage > 90) {
              setPetalaImage(require('../../assets/petala100.png'));
              setPetalaStyle(styles.petala1000);
            }

            // Calcular média para bem-estar ajustada pela quantidade de pessoas
            const bemEstarSum = data.bem_estar_01 + data.bem_estar_02 + data.bem_estar_03 + data.bem_estar_04 + data.bem_estar_05;
            const bemEstarAverage = (((bemEstarSum / 5) / pessoas) * 20);
            console.log("bemEstarAverage:", bemEstarAverage);

            if (bemEstarAverage <= 30) {
              setBemEstarPetalaImage(require('../../assets/petala20.png'));
              setBemEstarPetalaStyle(styles.petala201);
            } else if (bemEstarAverage > 30 && bemEstarAverage <= 50) {
              setBemEstarPetalaImage(require('../../assets/petala40.png'));
              setBemEstarPetalaStyle(styles.petala401);
            } else if (bemEstarAverage > 50 && bemEstarAverage <= 70) {
              setBemEstarPetalaImage(require('../../assets/petala60.png'));
              setBemEstarPetalaStyle(styles.petala601);
            } else if (bemEstarAverage > 70 && bemEstarAverage <= 90) {
              setBemEstarPetalaImage(require('../../assets/petala80.png'));
              setBemEstarPetalaStyle(styles.petala801);
            } else if (bemEstarAverage > 90) {
              setBemEstarPetalaImage(require('../../assets/petala100.png'));
              setBemEstarPetalaStyle(styles.petala1001);
            }

            const segSum = data.seguranca_01 + data.seguranca_02 + data.seguranca_03 + data.seguranca_04 + data.seguranca_05;
            const segAverage = (((segSum / 5) / pessoas) * 20);
            console.log("Segurancaaverage:", segAverage);

            if (segAverage <= 30) {
              setPetalaImage1(require('../../assets/petala20.png'));
              setPetalaStyle1(styles.petala202);
            } else if (segAverage > 30 && segAverage <= 50) {
              setPetalaImage1(require('../../assets/petala40.png'));
              setPetalaStyle1(styles.petala402);
            } else if (segAverage > 50 && segAverage <= 70) {
              setPetalaImage1(require('../../assets/petala60.png'));
              setPetalaStyle1(styles.petala602);
            } else if (segAverage > 70 && segAverage <= 90) {
              setPetalaImage1(require('../../assets/petala80.png'));
              setPetalaStyle1(styles.petala802);
            } else if (segAverage > 90) {
              setPetalaImage1(require('../../assets/petala100.png'));
              setPetalaStyle1(styles.petala1002);
            }



            const pertSum = data.pertencimento_01 + data.pertencimento_02 + data.pertencimento_03 + data.pertencimento_04 + data.pertencimento_05;
            const pertAverage = (((pertSum / 5) / pessoas) * 20);
            console.log("Pertencimentoaverage:", pertAverage);

            if (pertAverage <= 30) {
              setPetalaImage2(require('../../assets/petala20.png'));
              setPetalaStyle2(styles.petala203);
            } else if (pertAverage > 30 && pertAverage <= 50) {
              setPetalaImage2(require('../../assets/petala40.png'));
              setPetalaStyle2(styles.petala403);
            } else if (pertAverage > 50 && pertAverage <= 70) {
              setPetalaImage2(require('../../assets/petala60.png'));
              setPetalaStyle2(styles.petala603);
            } else if (pertAverage > 70 && pertAverage <= 90) {
              setPetalaImage2(require('../../assets/petala80.png'));
              setPetalaStyle2(styles.petala803);
            } else if (pertAverage > 90) {
              setPetalaImage2(require('../../assets/petala100.png'));
              setPetalaStyle2(styles.petala1003);
            }




          } else {
            console.log("Missing data points for calculations.");
          }
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching document: ", error);
      } finally {
        setLoading(false); // Finalize loading state
      }
    }

    // Simular um tempo de carregamento inicial de 2 segundos
    setTimeout(() => {
      setInitialLoading(false);
      fetchData();
    }, 2000);

    return () => {
      if (unsubscribe && typeof unsubscribe === 'function') {
        unsubscribe();
      }
    };
  }, [novoJardineteDocId]);

  if (initialLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (loading) {
    return <Text>Loading...</Text>; // Show loading state while data is being fetched
  }

  if (!documentData) {
    return <Text>Erro ao carregar os dados.</Text>; // Handle case where data is not available
  }

  return (
    <ScrollView style={styles.scroll}>
      <View style={styles.container}>
        <View style={styles.navbar}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate("Menu")}>
          <Ionicons name="arrow-back" size={width * 0.025} color="white" />
        </TouchableOpacity>
          <View style={styles.imageContainer}>
            {imageUrl ? (
              <Image
                style={styles.logoImage}
                source={{
                  uri: imageUrl,
                }}
              />
            ) : (
              <Text>Imagem não disponível</Text>
            )}
          </View>
        </View>

        <View style={styles.bigRet}></View>
        <View style={styles.bigWheel}></View>
        <View style={styles.retGreen}>
          <Text style={styles.retGreenText}>
         
            Este é o gráfico onde cada pátala do Manacá representa uma área de impacto no seu jardinete. Clique nos ícones para ver cada área com mais detalhes.
          </Text>
        </View>

        <Image source={require('../../assets/analise.png')} style={styles.analise} />

        <View style={styles.infraContainer}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Infraestrutura', { novoJardineteDocId })}>
            <Image source={require('../../assets/infraIcon.png')} style={styles.infra} />
          </TouchableOpacity>
          <View style={styles.infraContainer2}>
            <Image source={require('../../assets/infraText.png')} style={styles.infraText} />
            <View style={styles.infraRet}></View>
          </View>
        </View>

        <View style={styles.bemContainer}>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('BemEstar', { novoJardineteDocId })}>
            <Image source={require('../../assets/bemIcon.png')} style={styles.bem} />
          </TouchableOpacity>
          <View style={styles.bemContainer2}>
            <Image source={require('../../assets/bemText.png')} style={styles.bemText} />
            <View style={styles.bemRet}></View>
          </View>
        </View>

        <View style={styles.segContainer}>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Seguranca', { novoJardineteDocId })}>
            <Image source={require('../../assets/segIcon.png')} style={styles.seg} />
          </TouchableOpacity>
          <View style={styles.segContainer2}>
            <Image source={require('../../assets/segText.png')} style={styles.segText} />
            <View style={styles.segRet}></View>
          </View>
        </View>

        <View style={styles.pertContainer}>
          <View style={styles.pertContainer2}>
            <Image source={require('../../assets/pertText.png')} style={styles.pertText} />
            <View style={styles.pertRet}></View>
          </View>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Pertencimento', { novoJardineteDocId })}>
            <Image source={require('../../assets/pertIcon.png')} style={styles.pert} />
          </TouchableOpacity>
        </View>

        <View style={styles.centralContainer}>
          <Image source={require('../../assets/folhas.png')} style={styles.folhas} />
          <Image source={petalaImage} style={petalaStyle} />
          <Image source={bemEstarPetalaImage} style={bemEstarPetalaStyle} />
          <Image source={petalaImage1} style={petalaStyle1} />
          <Image source={petalaImage2} style={petalaStyle2} />
          <Image source={require('../../assets/miolo.png')} style={styles.miolo} />
        </View>

        <View style={styles.retExp}>
          <View style={styles.circExp}>
            <View style={styles.circ}></View>
            <View style={styles.circ}></View>
            <View style={styles.circ}></View>
            <View style={styles.circ}></View>
          </View>
        </View>

        <View style={styles.araucarias2}>
          <Image source={require('../../assets/araucarias.png')} style={styles.araucarias} />
        </View>

        <TouchableOpacity style={styles.backButtonGradient} onPress={() => navigation.goBack()}>
  <LinearGradient
    colors={['#4C6523', '#99CB47']}
    style={styles.gradient}
  >
    <Ionicons/>
    <Text style={styles.backButtonText}>Voltar</Text>
  </LinearGradient>
</TouchableOpacity>

        <View style={styles.navbar2}>
          <View style={styles.imageContainer22}>
            <Image source={require('../../assets/UtfprBottom.png')} style={styles.utfprImage} />
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
