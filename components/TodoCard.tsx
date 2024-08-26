import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Todo } from '@/types';

type TodoCardProps = {
  todo: Todo;
};

const TodoCard: React.FC<TodoCardProps> = ({ todo }) => {
    const getPriorityColor = (priority: string) => {
        switch (priority) {
          case 'high':
            return '#ff4d4f';
          case 'medium':
            return '#faad14';
          case 'low':
            return '#52c41a'; 
          default:
            return '#000'; 
        }
      };
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{todo.title}</Text>
      <Text style={[styles.priority, { color: getPriorityColor(todo.priority) }]}>
        Priority: {todo.priority}
      </Text>      
      <Text>Category: {todo.category}</Text>
      <Text>Due Date: {todo.date}</Text>
      <Text>Steps:</Text>
      {todo.steps.map((step, index) => (
        <Text key={index} style={styles.step}>
          {index + 1}. {step}
        </Text>
      ))}
      <Text>Status: {todo.done ? 'Done' : 'Pending'}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 15,
    margin: 10,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  step: {
    marginLeft: 10,
  },
  priority: {
    fontWeight: 'bold',
    marginBottom: 5,
  }
});

export default TodoCard;
