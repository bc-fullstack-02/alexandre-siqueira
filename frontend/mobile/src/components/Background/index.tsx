import { View } from "react-native";
import { styles } from "../Background/styles"

interface Props {
    children: React.ReactNode
}

export function Background({children}: Props){
    return (
        <View style={styles.container}>{children}</View>
    )
}