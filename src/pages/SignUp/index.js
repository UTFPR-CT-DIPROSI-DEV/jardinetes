import React, { useState, useRef } from 'react';
import { ScrollView, ImageBackground, View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, Image, Modal, CheckBox, Dimensions } from 'react-native';
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, setDoc, doc } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import cadPage from '../../assets/cadPage.png';
import { styles } from '../SignUp/styles';
import { Ionicons } from '@expo/vector-icons'; 

const firebaseConfig = {
    apiKey: "AIzaSyBe8nNAzDIXpriQ2fqE7QFHAMtETRbiN84",
    authDomain: "amigosdosjardinetes.firebaseapp.com",
    projectId: "amigosdosjardinetes",
    storageBucket: "amigosdosjardinetes.appspot.com",
    messagingSenderId: "381072997535",
    appId: "1:381072997535:web:157abb3a076162a90836aa"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const { width, height } = Dimensions.get('window');

export default function SignUp() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [city, setCity] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showTermsModal, setShowTermsModal] = useState(false);
    const [agreedToTerms, setAgreedToTerms] = useState(false);
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const scrollViewRef = useRef(null);
    const navigation = useNavigation();

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };

    const handleRegister = async () => {
        setEmailError('');
        setPasswordError('');

        if (password !== confirmPassword) {
            setPasswordError("As senhas não coincidem.");
            return;
        }

        if (!validateEmail(email)) {
            setEmailError("Formato de email inválido.");
            return;
        }

        if (password.length < 6) {
            setPasswordError("A senha deve ter pelo menos 6 caracteres.");
            return;
        }

        if (!agreedToTerms) {
            Alert.alert("Erro", "Você deve concordar com os termos e condições.");
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            await setDoc(doc(firestore, 'users', user.uid), {
                username,
                email,
                city
            });
            Alert.alert("Sucesso", "Usuário registrado com sucesso!");
            navigation.navigate('Menu'); // Navegue para a tela de login ou qualquer outra tela após o registro
        } catch (error) {
            if (error.code === 'auth/email-already-in-use') {
                setEmailError("Este email já está cadastrado.");
            } else {
                Alert.alert("Erro", error.message);
            }
        }
    };

    return (
        <ScrollView horizontal>
            <ScrollView contentContainerStyle={styles.scrollViewContent} ref={scrollViewRef}>
                <ImageBackground source={cadPage} resizeMode="cover" style={styles.image}>
                    <View style={styles.container}>
                    <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={width * 0.025} color="white" />
        </TouchableOpacity>
                        <View style={styles.card}>
                            <Text style={styles.title}>Cadastro</Text>

                            <View style={styles.inputContainer}>
                                <Text style={styles.label}>Nome</Text>
                                <TextInput
                                    style={styles.input}
                                    value={username}
                                    onChangeText={setUsername}
                                />
                            </View>

                            <View style={styles.inputContainer}>
                                <Text style={styles.label}>Email</Text>
                                <TextInput
                                    style={[styles.input2, emailError ? { borderColor: 'red', borderWidth: 1 } : {}]}
                                    value={email}
                                    onChangeText={setEmail}
                                />
                                {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
                            </View>

                            <View style={styles.inputContainer}>
                                <Text style={styles.label}>Cidade</Text>
                                <TextInput
                                    style={styles.input}
                                    value={city}
                                    onChangeText={setCity}
                                />
                            </View>

                            <View style={styles.inputContainer}>
                                <Text style={styles.label}>Senha</Text>
                                <TextInput
                                    style={[styles.input2, passwordError ? { borderColor: 'red', borderWidth: 1 } : {}]}
                                    secureTextEntry
                                    value={password}
                                    onChangeText={setPassword}
                                />
                                {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
                            </View>

                            <View style={styles.inputContainer}>
                                <Text style={styles.label}>Confirmar Senha</Text>
                                <TextInput
                                    style={[styles.input2, passwordError ? { borderColor: 'red', borderWidth: 1 } : {}]}
                                    secureTextEntry
                                    value={confirmPassword}
                                    onChangeText={setConfirmPassword}
                                />
                            </View>

                            <Modal
                                animationType="slide"
                                transparent={false}
                                visible={showTermsModal}
                                onRequestClose={() => setShowTermsModal(false)}
                            >
                                 <View style={styles.termsModalContainer}>
                                    <View style={styles.termsModalContent}>
                                        <ScrollView>
                                              <Text style={styles.termsModalText}>
                                <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Política de Privacidade{'\n'}</Text>
                                A presente Política de Privacidade foi elaborada em conformidade com a lei federal nº 12.965, de 23 de abril de 2014 (Marco Civil da Internet) e lei nº 13.709, de 14 de agosto 2018 (Lei Geral de Proteção de Dados Pessoais).
                                A Universidade Tecnológica Federal do Paraná criou esta aplicação como um sistema gratuito. Este aplicativo é fornecido pela Universidade Tecnológica Federal do Paraná, sem nenhum custo, e destina-se ao uso como está. Esta página é usada para informar os visitantes sobre nossas políticas de coleta, uso e divulgação de informações pessoais, se alguém decidir usar nosso serviço.
                                Se você optar por usar nossa aplicação, concorda em coletar e usar informações em relação a esta política. As informações pessoais que coletamos são usadas para fornecer e melhorar o serviço. Não usaremos ou compartilharemos suas informações com ninguém, exceto conforme descrito nesta Política de Privacidade.
                                Os termos usados nesta Política de Privacidade têm os mesmos significados que em nossos Termos e Condições, que são acessíveis, a menos que definido de outra forma nesta Política de Privacidade.{'\n'}
                                <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Coleta e uso de informações{'\n'}</Text>
                                Para uma experiência melhor, ao usar nosso aplicativo, podemos solicitar que você nos forneça certas informações de identificação pessoal, incluindo, entre outras: nome, redes sociais.
                                As informações que solicitamos serão retidas por nós e usadas conforme descrito nesta política de privacidade.{'\n'}
                                <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Das permissões de acesso ao dispositivo{'\n'}</Text>
                                Esta aplicação pode solicitar certas permissões de acesso aos dados do dispositivo do usuário. Por padrão essas permissões devem ser concedidas pelo usuário antes que as respectivas informações possam ser acessadas. Uma vez que for dada essa permissão, esta pode ser revogada a qualquer momento pelo usuário, alterando as configurações no próprio dispositivo. A revogação das permissões de acesso poderá afetar o funcionamento apropriado da aplicação.{'\n'}
                                <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Permissão de localização aproximada do jardinete{'\n'}</Text>
                                Essa permissão será utilizada para acessar a localização aproximada do dispositivo do usuário. Este aplicativo poderá coletar e utilizar a localização aproximada, a modo de que usuários podem ter um mapa para localizar o jardinete.{'\n'}
                                <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Provedores de serviço{'\n'}</Text>
                                Podemos empregar empresas devido aos seguintes motivos:
                                Facilitar nosso serviço;
                                Fornecer o serviço em nosso nome;
                                Executar serviços relacionados à aplicação; ou
                                Para nos ajudar a analisar como nossa aplicação é usada.
                                Desejamos informar aos usuários desta aplicação que esses terceiros têm acesso às suas informações pessoais. O motivo é executar as tarefas atribuídas a eles em nosso nome. No entanto, eles são obrigados a não divulgar ou usar as informações para qualquer outra finalidade.{'\n'}
                                <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Segurança{'\n'}</Text>
                                Valorizamos sua confiança em nos fornecer suas informações pessoais; portanto, estamos nos esforçando para usar meios comercialmente aceitáveis de protegê-las. Mas lembre-se de que nenhum método de transmissão pela internet ou método de armazenamento eletrônico é 100% seguro e confiável, portanto não podemos garantir sua segurança absoluta.{'\n'}
                                <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Links para outros sites{'\n'}</Text>
                                Este serviço pode conter links para outros sites. Se você clicar em um link de terceiros, será direcionado para esse site. Observe que esses sites externos não são operados por nós. Portanto, recomendamos que você reveja a Política de Privacidade desses sites. Não temos controle e não assumimos nenhuma responsabilidade pelo conteúdo, políticas de privacidade ou práticas de sites ou serviços de terceiros.{'\n'}
                                <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Privacidade das crianças{'\n'}</Text>
                                Esta aplicação não trata de menores de 13 anos. Não coletamos intencionalmente informações de identificação pessoal de crianças menores de 13 anos. No caso de descobrirmos que uma criança menor de 13 anos nos forneceu informações pessoais, a excluiremos imediatamente de nossos servidores. Se você é pai, mãe ou responsável e sabe que seu filho nos forneceu informações pessoais, entre em contato conosco para que possamos realizar as ações necessárias. {'\n'}
                                Alterações a esta Política de Privacidade{'\n'}
                                Podemos atualizar nossa Política de Privacidade periodicamente. Portanto, é recomendável revisar esta página periodicamente para verificar se há alterações. Iremos notificá-lo de quaisquer alterações publicando a nova Política de Privacidade nesta página.{'\n'}
                                Esta política é eficaz a partir de 24/03/2024.{'\n'}
                                <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Contate-nos{'\n'}</Text>
                                Se você tiver alguma dúvida ou sugestão sobre nossa Política de Privacidade, não hesite em nos contactar em <Text style={{ fontWeight: 'bold', fontSize: 16 }}>jardinetes-ct@utfpr.edu.br</Text>.
                            </Text>
                                        </ScrollView>
                                        <TouchableOpacity onPress={() => { setShowTermsModal(false); setAgreedToTerms(true); }}>
                                            <Text style={styles.agreeButton}>Concordo com os termos</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => { setShowTermsModal(false); setAgreedToTerms(false); }}>
                                            <Text style={styles.disagreeButton}>Não concordo com os termos</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </Modal>

                            <View style={styles.checkboxContainer}>
                                <CheckBox value={agreedToTerms} onValueChange={setAgreedToTerms} />
                                <Text style={{ marginLeft: 5 }}>Concordo com os</Text>
                                <TouchableOpacity onPress={() => setShowTermsModal(true)}>
                                    <Text style={{ textDecorationLine: 'underline', marginLeft: 5 }}>termos de serviço</Text>
                                </TouchableOpacity>
                            </View>

                            <TouchableOpacity
                                style={[styles.button, !agreedToTerms && { backgroundColor: '#999' }]}
                                onPress={handleRegister}
                                disabled={!agreedToTerms}
                            >
                                <Text style={styles.buttonText}>Registrar</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.gaiaContainer}>
                            <Image source={require('../../assets/queBom.png')} style={styles.bom} />
                            <Image source={require('../../assets/gaiaContainer.png')} style={styles.gaia} />
                        </View>
                    </View>
                </ImageBackground>
            </ScrollView>
        </ScrollView>
    );
}