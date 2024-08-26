import { Stack } from 'expo-router';
import React from 'react';

export default function OuterStack (){
    return (
        <Stack>
            <Stack.Screen name='Onboarding' options={{headerShown:false}}/>
        </Stack>
    )
}