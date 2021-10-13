import React from 'react'
import { View, Text, Touchable, TouchableOpacity } from 'react-native'
import { styles } from '../theme/appTheme'

export interface props {
    texto: string;
    color?: string;
    ancho?: boolean;
    accion: ( numeroTexto: string ) => void;
}

export const BtnCal = ({ texto, color = '#2D2D2D', ancho = false, accion }: props) => {
    return (
        <TouchableOpacity
         onPress={ () => accion ( texto ) }
        >
            <View style={{
                ...styles.boton,
                backgroundColor: color,
                width: (ancho) ? 148 : 65
            }}>

                <Text style={{
                    ...styles.botonTex,
                    color: (color === '#9B9B9B') ? 'black' : 'white'
                }}>{texto}</Text>
            </View>
        </TouchableOpacity>
    )
}
