import React from 'react';
import {View} from 'react-native';

import {observer} from 'mobx-react';
import {Text} from 'react-native-paper';

import {useTheme} from '../../hooks';
import {chatSessionStore, modelStore} from '../../store';

// Compact token count: 10240 -> "10k", 512 -> "512".
export const formatTokenCount = (count: number): string =>
  count >= 1000 ? `${Math.round(count / 1000)}k` : `${count}`;

// Shows how much of the context window the last turn occupied, e.g. "10k/24k".
// Hidden until a turn has finished with a known token count.
export const ContextUsageIndicator = observer(() => {
  const theme = useTheme();
  const nCtx = modelStore.activeContextSettings?.n_ctx;
  const used = chatSessionStore.lastCompletionResult?.used;

  if (!nCtx || used === undefined) {
    return null;
  }

  const nearFull = used / nCtx >= 0.9;

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'flex-end',
        paddingHorizontal: 16,
        paddingBottom: 4,
      }}
      testID="context-usage-indicator">
      <Text
        variant="labelSmall"
        style={{
          color: nearFull
            ? theme.colors.error
            : theme.colors.onSurfaceVariant,
        }}>
        {`${formatTokenCount(used)}/${formatTokenCount(nCtx)}`}
      </Text>
    </View>
  );
});
