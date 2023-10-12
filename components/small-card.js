import { Text, Avatar, Card } from 'react-native-paper';
import { StyleSheet, View, TouchableOpacity } from 'react-native';

const SmallCard = ({ item, onPress }) => {
   return (
      <Card style={styles.card}>
         <TouchableOpacity activeOpacity={0.8} onPress={() => onPress(item)}>
            <Card.Content style={styles.cardContent}>
               <Avatar.Image size={80} source={{ uri: item.avatarURL }} />
               <View style={styles.cardText}>
                  <Text variant="titleMedium">{item.title}</Text>
                  <Text variant="bodyMedium">{item.speciality}</Text>
                  <Text variant="bodyMedium" style={{ color: "#6A6A6A" }}>{item.city}</Text>
               </View>
            </Card.Content>
         </TouchableOpacity >
      </Card >
   );
};

export default SmallCard;

const styles = StyleSheet.create({
   card: {
      backgroundColor: "#fff",
   },
   cardContent: {
      paddingVertical: 15,
      flexDirection: 'row',
      alignItems: 'center'
   },
   cardText: {
      marginLeft: 20
   },
});
