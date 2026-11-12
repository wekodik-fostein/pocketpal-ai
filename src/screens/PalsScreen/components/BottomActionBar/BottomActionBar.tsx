import React from 'react';
import {View, TouchableOpacity} from 'react-native';

import {Text} from 'react-native-paper';
import {observer} from 'mobx-react-lite';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {useTheme} from '../../../../hooks';

import {createStyles} from './styles';
import {AddPalMenu} from '../AddPalMenu';

export type BottomActionType = 'search' | 'add' | 'profile';

interface BottomActionBarProps {
  activeAction: BottomActionType;
  onActionPress: (action: BottomActionType) => void;
  onCreatePal: (type: 'assistant' | 'roleplay' | 'video') => void;
  isAuthenticated: boolean;
}

interface ActionButtonProps {
  action: BottomActionType;
  label: string;
  icon: React.ReactNode;
  isActive: boolean;
  onPress: () => void;
}

const ActionButton: React.FC<ActionButtonProps> = ({
  action,
  label,
  icon,
  onPress,
}) => {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const styles = createStyles(theme, insets);

  return (
    <TouchableOpacity
      style={styles.actionButton}
      onPress={onPress}
      testID={`bottom-action-${action}`}>
      <View style={styles.iconContainer}>{icon}</View>
      <Text style={styles.actionLabel}>{label}</Text>
    </TouchableOpacity>
  );
};

export const BottomActionBar: React.FC<BottomActionBarProps> = observer(
  ({onActionPress, onCreatePal, isAuthenticated}) => {
    const theme = useTheme();
    const insets = useSafeAreaInsets();
    const styles = createStyles(theme, insets);

    const iconSize = 24;
    const iconColor = theme.colors.onSurfaceVariant;

    return (
      <View style={styles.container}>
        <View style={styles.actionBar}>
          {/* Add Pal Menu */}
          <AddPalMenu
            iconColor={iconColor}
            iconSize={iconSize}
            onCreatePal={onCreatePal}
          />

        </View>
      </View>
    );
  },
);
