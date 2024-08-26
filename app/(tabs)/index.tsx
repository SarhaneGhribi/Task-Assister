import React, { useCallback, useRef, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  LayoutAnimation,
} from "react-native";
import DraggableFlatList, {
  ScaleDecorator,
  ShadowDecorator,
  OpacityDecorator,
  RenderItemParams,
} from "react-native-draggable-flatlist";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Animated, { useAnimatedStyle } from "react-native-reanimated";
import SwipeableItem, {
  useSwipeableItemParams,
} from "react-native-swipeable-item";
export function getColor(i: number, numItems: number = 25) {
  const multiplier = 255 / (numItems - 1);
  const colorVal = i * multiplier;
  return `rgb(${colorVal}, ${Math.abs(128 - colorVal)}, ${255 - colorVal})`;
}

export const mapIndexToData = (item: Todo, index: number, arr: Todo[]) => {
  const backgroundColor = getColor(index, arr.length);
  return {
    ...item,
    backgroundColor,
    height: 75,
  };
};

const OVERSWIPE_DIST = 20;
const NUM_ITEMS = 20;
export type Item = ReturnType<typeof mapIndexToData>;
const initialData: Item[] = dummyTodos.map(mapIndexToData);

import { dummyTodos } from '@/constants/Dummydata';
import { Todo } from "@/types";

export default function HomeScreen() {
  const [data, setData] = useState(initialData);
  const itemRefs = useRef(new Map());

  const renderItem = useCallback((params: RenderItemParams<Item>) => {
    const onPressDelete = () => {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
      setData((prev) => {
        return prev.filter((item) => item !== params.item);
      });
    };

    return (
      <RowItem {...params} itemRefs={itemRefs} onPressDelete={onPressDelete} />
    );
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <DraggableFlatList
          keyExtractor={(item) => item.id}
          data={data}
          renderItem={renderItem}
          onDragEnd={({ data }) => {
            setData(data);
          }}
          activationDistance={20}
          onDragBegin={(index) => {
            console.log("draged", index);
          }}
        />
      </View>
    </GestureHandlerRootView>
  );
}


type RowItemProps = {
  item: Item;
  drag: () => void;
  onPressDelete: () => void;
  itemRefs: React.MutableRefObject<Map<any, any>>;
};

function RowItem({ item, itemRefs, drag, onPressDelete }: RowItemProps) {
  const [snapPointsLeft, setSnapPointsLeft] = useState([150]);

  return (
    <ScaleDecorator>
      <SwipeableItem
        key={item.id}
        item={item}
        ref={(ref) => {
          if (ref && !itemRefs.current.get(item.id)) {
            itemRefs.current.set(item.id, ref);
          }
        }}
        onChange={({ open }: any) => {
          if (open) {
            [...itemRefs.current.entries()].forEach(([key, ref]) => {
              if (key !== item.id && ref) ref.close();
            });
          }
        }}
        overSwipe={OVERSWIPE_DIST}
        renderUnderlayLeft={() => (
          <UnderlayLeft drag={drag} onPressDelete={onPressDelete} />
        )}
        renderUnderlayRight={() => <UnderlayRight />}
        snapPointsLeft={snapPointsLeft}
      >
        <TouchableOpacity
          activeOpacity={1}
          onPress={drag}
          style={[
            styles.row,
            { backgroundColor: item.backgroundColor, height: item.height },

          ]}
        >
          <Text style={styles.text}>{`${item.title}`}</Text>
        </TouchableOpacity>
      </SwipeableItem>
    </ScaleDecorator>
  );
}

const UnderlayLeft = ({
  drag,
  onPressDelete,
}: {
  drag: () => void;
  onPressDelete: () => void;
}) => {
  const { item, percentOpen } = useSwipeableItemParams<Todo>();
  const animStyle = useAnimatedStyle(
    () => ({
      opacity: percentOpen.value,
    }),
    [percentOpen]
  );

  return (
    <Animated.View style={[styles.row, styles.underlayLeft, animStyle]}>
      <TouchableOpacity onPress={onPressDelete}>
        <Text style={styles.text}>{`[delete]`}</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

function UnderlayRight() {
  const { close } = useSwipeableItemParams<Todo>();
  return (
    <Animated.View style={[styles.row, styles.underlayRight]}>
      <TouchableOpacity>
        {/* @ts-ignore */}
        <Text style={styles.text} onLongPress={close}>
          CLOSE
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  row: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
  },
  text: {
    fontWeight: "bold",
    color: "white",
    fontSize: 32,
  },
  underlayRight: {
    flex: 1,
    backgroundColor: "teal",
    justifyContent: "flex-start",
  },
  underlayLeft: {
    flex: 1,
    backgroundColor: "tomato",
    justifyContent: "flex-end",
  },
});