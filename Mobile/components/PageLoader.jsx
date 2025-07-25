import { ActivityIndicator, View } from 'react-native'
import { COLORS } from "../constants/colors.js"
import { styles } from "../assets/styles/home.styles.js"

const PageLoader = () => {
    return (
        <View style={styles.loadingContainer}>
            <ActivityIndicator
                size="large"
                color={COLORS.primary}
            />
        </View>
    )
}

export default PageLoader
