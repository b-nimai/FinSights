// import * as React from 'react'
// import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native'
// import { useSignUp } from '@clerk/clerk-expo'
// import { useRouter } from 'expo-router'
// import { styles } from "../../assets/styles/auth.styles.js"
// import { Ionicons } from '@expo/vector-icons'
// import { COLORS } from '../../constants/colors.js'
// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

// export default function SignUpScreen() {
//     const { isLoaded, signUp, setActive } = useSignUp()
//     const router = useRouter()

//     const [emailAddress, setEmailAddress] = React.useState('')
//     const [password, setPassword] = React.useState('')
//     const [pendingVerification, setPendingVerification] = React.useState(false)
//     const [code, setCode] = React.useState('')
//     const [error, setError] = React.useState("")

//     // Handle submission of sign-up form
//     const onSignUpPress = async () => {
//         if (!isLoaded) return

//         // Start sign-up process using email and password provided
//         try {
//             await signUp.create({
//                 emailAddress,
//                 password,
//             })

//             // Send user an email with verification code
//             await signUp.prepareEmailAddressVerification({ strategy: 'email_code' })

//             // Set 'pendingVerification' to true to display second form
//             // and capture OTP code
//             setPendingVerification(true)
//         } catch (err) {
//             if (err.errors?.code === "form_identifier_exists") {
//                 // Handle case where email already exists
//                 setError(err.errors?.[0]?.message || "Email already exists. Please try signing in.")
//             } else {
//                 setError(err.errors?.[0]?.message || "An error occurred. Please try again.")
//                 console.log(JSON.stringify(err, null, 2))
//             }
//         }
//     }

//     // Handle submission of verification form
//     const onVerifyPress = async () => {
//         if (!isLoaded) return

//         try {
//             // Use the code the user provided to attempt verification
//             const signUpAttempt = await signUp.attemptEmailAddressVerification({
//                 code,
//             })

//             // If verification was completed, set the session to active
//             // and redirect the user
//             if (signUpAttempt.status === 'complete') {
//                 await setActive({ session: signUpAttempt.createdSessionId })
//                 router.replace('/')
//             } else {
//                 // If the status is not complete, check why. User may need to
//                 // complete further steps.
//                 console.error(JSON.stringify(signUpAttempt, null, 2))
//             }
//         } catch (err) {
//             if (err.errors?.code === "form_password_too_short") {
//                 console.log(JSON.stringify(err, null, 2))
//                 setError(err.errors?.[0]?.message || "Password is too short. Please use at least 8 characters.")
//             } else if (err.errors?.code === "form_code_incorrect") {
//                 // Handle case where verification code is incorrect
//                 setError(err.errors?.[0]?.message || "Incorrect verification code. Please try again.")
//             } else {
//                 setError(err.errors?.[0]?.message || "An error occurred. Please try again.")
//                 console.log(JSON.stringify(err, null, 2))
//             }
//         }
//     }

//     if (pendingVerification) {
//         return (
//             <View style={styles.verificationContainer}>
//                 <Text style={styles.verificationTitle}>Verify your email</Text>

//                 {error && (
//                     <View style={styles.errorBox}>
//                         <Ionicons name="alert-circle" size={20} color={COLORS.textLight} />
//                         <Text style={styles.errorText}>{error}</Text>
//                         <TouchableOpacity onPress={() => setError("")}>
//                             <Ionicons name="close" size={20} color={COLORS.textLight} />
//                         </TouchableOpacity>
//                     </View>
//                 ) }

//                 <TextInput
//                     style={[styles.verificationInput, error && styles.errorInput]}
//                     value={code}
//                     placeholder="Enter your verification code"
//                     placeholderTextColor="#9A8478"
//                     onChangeText={(code) => setCode(code)}
//                 />
//                 <TouchableOpacity onPress={onVerifyPress} style={styles.button}>
//                     <Text style={styles.buttonText}>Verify</Text>
//                 </TouchableOpacity>
//             </View>
//         )
//     }

//     return (
//         <KeyboardAwareScrollView 
//             style={{ flex: 1 }}
//             contentContainerStyle={{ flexGrow: 1 }}
//             enableAutomaticScroll={true}
//             enableOnAndroid={true}
//             extraScrollHeight={100}
//         >
//             <View style={styles.container}>
//                 <Image
//                     source={require("../../assets/images/revenue-i2.png")}
//                     style={styles.illustration}
//                 />
//                 <Text style={styles.title}>Create Account</Text>

//                 {error ? (
//                     <View style={styles.errorBox}>
//                         <Ionicons name="alert-circle" size={20} color={COLORS.textLight} />
//                         <Text style={styles.errorText}>{error}</Text>
//                         <TouchableOpacity onPress={() => setError("")}>
//                             <Ionicons name="close" size={20} color={COLORS.textLight} />
//                         </TouchableOpacity>
//                     </View>
//                 ) : null}

//                 <TextInput
//                     style={[styles.input, error && styles.errorInput]}
//                     autoCapitalize="none"
//                     value={emailAddress}
//                     placeholder="Enter email"
//                     placeholderTextColor="#9A8478"
//                     onChangeText={(email) => setEmailAddress(email)}
//                 />
//                 <TextInput
//                     style={[styles.input, error && styles.errorInput]}
//                     value={password}
//                     placeholder="Enter password"
//                     placeholderTextColor="#9A8478"
//                     secureTextEntry={true}
//                     onChangeText={(password) => setPassword(password)}
//                 />
//                 <TouchableOpacity onPress={onSignUpPress} style={styles.button}>
//                     <Text style={styles.buttonText}>Continue</Text>
//                 </TouchableOpacity>

//                 <View style={styles.footerContainer}>
//                     <Text style={styles.footerText}>Already have an account?</Text>
//                     <TouchableOpacity onPress={() => router.back()}>
//                         <Text style={styles.linkText}>Sign in</Text>
//                     </TouchableOpacity>
//                 </View>
//             </View>
//         </KeyboardAwareScrollView>
//     )
// }

import * as React from 'react';
import {
    Image,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    ScrollView,
    KeyboardAvoidingView,
    Platform
} from 'react-native';
import { useSignUp } from '@clerk/clerk-expo';
import { useRouter } from 'expo-router';
import { styles } from "../../assets/styles/auth.styles.js";
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../constants/colors.js';

export default function SignUpScreen() {
    const { isLoaded, signUp, setActive } = useSignUp();
    const router = useRouter();

    const [emailAddress, setEmailAddress] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [pendingVerification, setPendingVerification] = React.useState(false);
    const [code, setCode] = React.useState('');
    const [error, setError] = React.useState("");

    const onSignUpPress = async () => {
        if (!isLoaded) return;

        try {
            await signUp.create({ emailAddress, password });
            await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });
            setPendingVerification(true);
        } catch (err) {
            if (err.errors?.code === "form_identifier_exists") {
                setError(err.errors?.[0]?.message || "Email already exists. Please try signing in.");
            } else {
                setError(err.errors?.[0]?.message || "An error occurred. Please try again.");
                console.log(JSON.stringify(err, null, 2));
            }
        }
    };

    const onVerifyPress = async () => {
        if (!isLoaded) return;

        try {
            const signUpAttempt = await signUp.attemptEmailAddressVerification({ code });

            if (signUpAttempt.status === 'complete') {
                await setActive({ session: signUpAttempt.createdSessionId });
                router.replace('/');
            } else {
                console.error(JSON.stringify(signUpAttempt, null, 2));
            }
        } catch (err) {
            if (err.errors?.code === "form_password_too_short") {
                setError(err.errors?.[0]?.message || "Password is too short.");
            } else if (err.errors?.code === "form_code_incorrect") {
                setError(err.errors?.[0]?.message || "Incorrect verification code.");
            } else {
                setError(err.errors?.[0]?.message || "An error occurred. Please try again.");
                console.log(JSON.stringify(err, null, 2));
            }
        }
    };

    if (pendingVerification) {
        return (
            <View style={styles.verificationContainer}>
                <Text style={styles.verificationTitle}>Verify your email</Text>

                {error && (
                    <View style={styles.errorBox}>
                        <Ionicons name="alert-circle" size={20} color={COLORS.textLight} />
                        <Text style={styles.errorText}>{error}</Text>
                        <TouchableOpacity onPress={() => setError("")}>
                            <Ionicons name="close" size={20} color={COLORS.textLight} />
                        </TouchableOpacity>
                    </View>
                )}

                <TextInput
                    style={[styles.verificationInput, error && styles.errorInput]}
                    value={code}
                    placeholder="Enter your verification code"
                    placeholderTextColor="#9A8478"
                    onChangeText={setCode}
                />
                <TouchableOpacity onPress={onVerifyPress} style={styles.button}>
                    <Text style={styles.buttonText}>Verify</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
        >
            <ScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                keyboardShouldPersistTaps="handled"
            >
                <View style={styles.container}>
                    <Image
                        source={require("../../assets/images/revenue-i2.png")}
                        style={styles.illustration}
                    />
                    <Text style={styles.title}>Create Account</Text>

                    {error ? (
                        <View style={styles.errorBox}>
                            <Ionicons name="alert-circle" size={20} color={COLORS.textLight} />
                            <Text style={styles.errorText}>{error}</Text>
                            <TouchableOpacity onPress={() => setError("")}>
                                <Ionicons name="close" size={20} color={COLORS.textLight} />
                            </TouchableOpacity>
                        </View>
                    ) : null}

                    <TextInput
                        style={[styles.input, error && styles.errorInput]}
                        autoCapitalize="none"
                        value={emailAddress}
                        placeholder="Enter email"
                        placeholderTextColor="#9A8478"
                        onChangeText={setEmailAddress}
                    />
                    <TextInput
                        style={[styles.input, error && styles.errorInput]}
                        value={password}
                        placeholder="Enter password"
                        placeholderTextColor="#9A8478"
                        secureTextEntry
                        onChangeText={setPassword}
                    />
                    <TouchableOpacity onPress={onSignUpPress} style={styles.button}>
                        <Text style={styles.buttonText}>Continue</Text>
                    </TouchableOpacity>

                    <View style={styles.footerContainer}>
                        <Text style={styles.footerText}>Already have an account?</Text>
                        <TouchableOpacity onPress={() => router.back()}>
                            <Text style={styles.linkText}>Sign in</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}
