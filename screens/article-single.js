import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, Image, Dimensions } from 'react-native';
import { Text } from 'react-native-paper';
import HTML from 'react-native-render-html';

const { width } = Dimensions.get('window');

const Article = ({ route }) => {
   const [aspectRatio, setAspectRatio] = useState(null);

   useEffect(() => {
      Image.getSize(
         route.params.coverURL,
         (originalWidth, originalHeight) => {
            const ratio = originalWidth / originalHeight;
            setAspectRatio(ratio);
         },
         (error) => {
            console.error('Error loading image:', error);
         }
      );
   }, []);

   const tagsStyles = {
      'body': {
         lineHeight: 21,
         fontSize: 14.5
      },
   };

   return (
      <ScrollView style={styles.lightPurpleBackground}>
         <View style={styles.container}>
            <Text variant="headlineSmall">{route.params.title}</Text>
            <Text variant="bodySmall" style={{ marginTop: 5 }}>{route.params.time}</Text>
            <View style={{ marginTop: 20 }}>
               <Image
                  source={{ uri: route.params.coverURL }}
                  style={[styles.image, { aspectRatio }]}
               />
            </View>
            <View style={{ marginTop: 20 }} >
               <HTML
                  source={{ html: route.params.content }}
                  tagsStyles={tagsStyles}
                  contentWidth={width} />
            </View>
         </View>
      </ScrollView>
   );
}

export default Article;

const styles = StyleSheet.create({
   container: {
      flex: 1,
      padding: 15,
   },
   lightPurpleBackground: {
      backgroundColor: "#faf8fe"
   },
   image: {
      borderRadius: 10,
      resizeMode: 'contain',
   },
});