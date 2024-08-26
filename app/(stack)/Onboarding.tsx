import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Colors } from '@/constants/Colors'

type Props = {}

const Onboarding = (props: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Onboarding</Text>
    </View>
  )
}

export default Onboarding

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    title : {
        color: Colors.light.text,
        fontSize: 24
        
    }
})