// import { useSignIn } from '@clerk/clerk-expo'
// import { Link, useRouter } from 'expo-router'
// import { Text, TextInput, TouchableOpacity, View, Image } from 'react-native'
// import React from 'react'
// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
// import { styles } from '../../assets/styles/auth.styles'
// import { COLORS } from '../../constants/colors'
// import { Ionicons } from '@expo/vector-icons'


// export default function Page() {
//     const { signIn, setActive, isLoaded } = useSignIn()
//     const router = useRouter()

//     const [emailAddress, setEmailAddress] = React.useState('')
//     const [password, setPassword] = React.useState('')
//         const [error, setError] = React.useState()
    

//     // Handle the submission of the sign-in form
//     const onSignInPress = async () => {
//         if (!isLoaded) return

//         // Start the sign-in process using the email and password provided
//         try {
//             const signInAttempt = await signIn.create({
//                 identifier: emailAddress,
//                 password,
//             })

//             // If sign-in process is complete, set the created session as active
//             // and redirect the user
//             if (signInAttempt.status === 'complete') {
//                 await setActive({ session: signInAttempt.createdSessionId })
//                 router.replace('/')
//             } else {
//                 // If the status isn't complete, check why. User might need to
//                 // complete further steps.
//                 console.error(JSON.stringify(signInAttempt, null, 2))
//             }
//         } catch (err) {
//             if(err.errors?.code === "form_password_incorrect") {
//                 // Handle incorrect password error
//                 setError(err.errors?.[0]?.message || "Incorrect password. Please try again.")
//             } else if (err.errors?.code === "form_identifier_not_found") {
//                 // Handle invalid email error
//                 setError(err.errors?.[0]?.message || "Couldn't find your account. Please create one.")
//             } else {
//                 // Handle other errors
//                 console.error(JSON.stringify(err, null, 2))
//                 setError(err.errors?.[0]?.message || "An error occurred. Please try again.")
//             }
//         }
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
//                     source={require('../../assets/images/revenue-i4.png')}
//                     style={styles.illustration}
//                 />
//                 <Text style={styles.title}>Welcome Back</Text>

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
//                     onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
//                 />
//                 <TextInput
//                     style={[styles.input, error && styles.errorInput]}
//                     value={password}
//                     placeholder="Enter password"
//                     placeholderTextColor="#9A8478"
//                     secureTextEntry={true}
//                     onChangeText={(password) => setPassword(password)}
//                 />

//                 <TouchableOpacity style={styles.button} onPress={onSignInPress}>
//                     <Text style={styles.buttonText}>Continue</Text>
//                 </TouchableOpacity>

//                 <View style={styles.footerContainer}>
//                     <Text style={styles.footerText}>Don&apos;t have an account?</Text>
//                     <Link href="/sign-up" asChild>
//                         <Text style={styles.linkText}> Sign Up</Text>
//                     </Link>
//                 </View>
//             </View>
//         </KeyboardAwareScrollView>
//     )
// }


import { useSignIn } from '@clerk/clerk-expo'
import { Link, useRouter } from 'expo-router'
import {
    Text,
    TextInput,
    TouchableOpacity,
    View,
    Image,
    ScrollView,
    KeyboardAvoidingView,
    Platform
} from 'react-native'
import React from 'react'
import { styles } from '../../assets/styles/auth.styles'
import { COLORS } from '../../constants/colors'
import { Ionicons } from '@expo/vector-icons'

export default function Page() {
    const { signIn, setActive, isLoaded } = useSignIn()
    const router = useRouter()

    const [emailAddress, setEmailAddress] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [error, setError] = React.useState('')

    const onSignInPress = async () => {
        if (!isLoaded) return

        try {
            const signInAttempt = await signIn.create({
                identifier: emailAddress,
                password
            })

            if (signInAttempt.status === 'complete') {
                await setActive({ session: signInAttempt.createdSessionId })
                router.replace('/')
            } else {
                console.error(JSON.stringify(signInAttempt, null, 2))
            }
        } catch (err) {
            if (err.errors?.code === 'form_password_incorrect') {
                setError(err.errors?.[0]?.message || 'Incorrect password. Please try again.')
            } else if (err.errors?.code === 'form_identifier_not_found') {
                setError(err.errors?.[0]?.message || "Couldn't find your account. Please create one.")
            } else {
                console.error(JSON.stringify(err, null, 2))
                setError(err.errors?.[0]?.message || 'An error occurred. Please try again.')
            }
        }
    }

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
        >
            <ScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                keyboardShouldPersistTaps="handled"
            >
                <View style={styles.container}>
                    <Image
                        source={require('../../assets/images/revenue-i4.png')}
                        style={styles.illustration}
                    />
                    <Text style={styles.title}>Welcome Back</Text>

                    {error ? (
                        <View style={styles.errorBox}>
                            <Ionicons name="alert-circle" size={20} color={COLORS.textLight} />
                            <Text style={styles.errorText}>{error}</Text>
                            <TouchableOpacity onPress={() => setError('')}>
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

                    <TouchableOpacity style={styles.button} onPress={onSignInPress}>
                        <Text style={styles.buttonText}>Continue</Text>
                    </TouchableOpacity>

                    <View style={styles.footerContainer}>
                        <Text style={styles.footerText}>Don&apos;t have an account?</Text>
                        <Link href="/sign-up" asChild>
                            <Text style={styles.linkText}> Sign Up</Text>
                        </Link>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}
