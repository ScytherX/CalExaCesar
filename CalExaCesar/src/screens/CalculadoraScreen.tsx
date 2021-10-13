import React, { useRef, useState } from 'react'
import { View, Text } from 'react-native'
import { BtnCal, props } from '../components/BtnCal'
import { styles } from '../theme/appTheme'

enum operadores {
    sumar, restar, multiplicar, dividir, potencia, raiz
}

export const CalculadoraScreen = () => {

    const [NumeroAnt, setNumeroAnt] = useState('0');
    const [Numero, setNumero] = useState('0');
    const ultOp = useRef<operadores>()

    const limpiar = () => {
        setNumero('0');
    }

    const armNum = (numeroTexto: string) => {
        if (Numero.includes('.') && numeroTexto === '.') return;

        if (Numero.startsWith('0') || Numero.startsWith('-0')) {
            if (numeroTexto === '.') {
                setNumero(Numero + numeroTexto);
            } else if (numeroTexto === '0' && Numero.includes('.')) {
                setNumero(Numero + numeroTexto);
            } else if (numeroTexto !== '0' && !Numero.includes('.')) {
                setNumero(numeroTexto);
            }
            else if (numeroTexto === '0' && !Numero.includes('.')) {
                setNumero(Numero);
            }

        } else {
            setNumero(Numero + numeroTexto);
        }
    }

    /* const bdelete = () => {
         let negativo = ''
         let numeroTmp = Numero;
         if (Numero.includes('-')) {
             negativo = '-';
             numeroTmp = Numero.substr(1);
         }
 
         if (numeroTmp.length > 1) {
             setNumero(negativo + numeroTmp.slice(0, -1));
         } else {
             setNumero('0');
         }
     }*/

    const positivoNegativo = () => {
        if (Numero.includes('-')) {
            setNumero(Numero.replace('-', ''));
        } else {
            setNumero('-' + Numero);
        }
    }

    const cambiarNumPorAnterior = () => {
        if (Numero.endsWith('.')) {
            setNumeroAnt(Numero.slice(0, -1));
        } else {
            setNumeroAnt(Numero);
        }
        setNumero('0');
    }

    const bRaz = () => {
        if(Numero.includes('-')){
            <Text>NaH</Text>
        }else{
            ultOp.current = operadores.raiz
        }
    }
    const bPot = () => {
        cambiarNumPorAnterior();
        ultOp.current = operadores.potencia
    }
    const bDiv = () => {
        cambiarNumPorAnterior();
        ultOp.current = operadores.dividir
    }
    const bsum = () => {
        cambiarNumPorAnterior();
        ultOp.current = operadores.sumar
    }

    const calcular = () => {
        const num1 = Number(Numero);
        const num2 = Number(NumeroAnt);

        switch (ultOp.current) {
            case operadores.sumar:
                setNumero(`${num1 + num2}`)
                break
            case operadores.restar:
                setNumero(`${num1 - num2}`)
                break
            case operadores.multiplicar:
                setNumero(`${num1 * num2}`)
                break
            case operadores.dividir:
                setNumero(`${num1 / num2}`)
                break
            case operadores.potencia:
                setNumero(`${Math.pow(num2, num1)}`)
                break
            case operadores.raiz:
                setNumero(`${Math.sqrt(num1)}`)
                break
        }

    }

    const bres = () => {
        cambiarNumPorAnterior();
        ultOp.current = operadores.restar
    }
    const bmul = () => {
        cambiarNumPorAnterior();
        ultOp.current = operadores.multiplicar
    }
    return (
        <View style={styles.calculadoraContainer}>
            {
                (NumeroAnt !== '0') && (
                    <Text style={styles.resultadoPequeño}>{NumeroAnt}</Text>
                )
            }

            <Text
                style={styles.resultado}
                numberOfLines={1}
                adjustsFontSizeToFit
            >
                {Numero}
            </Text>

            <View style={styles.fila}>

                <BtnCal texto="C" color="#9B9B9B" accion={limpiar} />
                <BtnCal texto="√" color="#9B9B9B" accion={bRaz} />
                <BtnCal texto="x^2" color="#9B9B9B" accion={bPot} />
                <BtnCal texto="/" color="#FF9427" accion={bDiv} />

            </View>

            <View style={styles.fila}>

                <BtnCal texto="7" accion={armNum} />
                <BtnCal texto="8" accion={armNum} />
                <BtnCal texto="9" accion={armNum} />
                <BtnCal texto="x" color="#FF9427" accion={bmul} />

            </View>

            <View style={styles.fila}>

                <BtnCal texto="4" accion={armNum} />
                <BtnCal texto="5" accion={armNum} />
                <BtnCal texto="6" accion={armNum} />
                <BtnCal texto="-" color="#FF9427" accion={bres} />

            </View>

            <View style={styles.fila}>

                <BtnCal texto="1" accion={armNum} />
                <BtnCal texto="2" accion={armNum} />
                <BtnCal texto="3" accion={armNum} />
                <BtnCal texto="+" color="#FF9427" accion={bsum} />

            </View>

            <View style={styles.fila}>

                <BtnCal texto="0" ancho accion={armNum} />
                <BtnCal texto="+/-" accion={positivoNegativo} />
                <BtnCal texto="=" color="#FF9427" accion={calcular} />

            </View>

        </View>
    )
}
