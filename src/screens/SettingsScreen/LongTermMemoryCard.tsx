import React, {useContext, useState} from 'react';
import {View} from 'react-native';

import {observer} from 'mobx-react-lite';
import {Button, Card, IconButton, Text, TextInput} from 'react-native-paper';

import {useTheme} from '../../hooks';
import {MAX_MEMORY_NOTE_LENGTH, memoryStore} from '../../store/MemoryStore';
import {L10nContext} from '../../utils';

import {createStyles} from './styles';

export const LongTermMemoryCard = observer(() => {
  const theme = useTheme();
  const styles = createStyles(theme);
  const l10n = useContext(L10nContext);
  const copy = l10n.settings.longTermMemory;
  const [draft, setDraft] = useState('');

  const handleAdd = () => {
    memoryStore.addNote(draft);
    setDraft('');
  };

  return (
    <Card elevation={0} style={styles.card}>
      <Card.Title title={copy.title} />
      <Card.Content>
        <Text variant="bodySmall" style={{marginBottom: 12}}>
          {copy.description}
        </Text>

        <TextInput
          mode="outlined"
          value={draft}
          onChangeText={setDraft}
          placeholder={copy.placeholder}
          maxLength={MAX_MEMORY_NOTE_LENGTH}
          multiline
          testID="long-term-memory-input"
        />
        <Button
          mode="contained"
          onPress={handleAdd}
          disabled={!draft.trim()}
          style={{marginTop: 8, marginBottom: 12}}
          testID="long-term-memory-add">
          {copy.add}
        </Button>

        {memoryStore.notes.length === 0 ? (
          <Text variant="bodySmall">{copy.empty}</Text>
        ) : (
          memoryStore.notes.map((note, index) => (
            <View
              key={`${index}-${note}`}
              style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={{flex: 1}}>{note}</Text>
              <IconButton
                icon="delete-outline"
                accessibilityLabel={copy.remove}
                onPress={() => memoryStore.removeNote(index)}
              />
            </View>
          ))
        )}

        {memoryStore.notes.length > 0 && (
          <Button mode="text" onPress={() => memoryStore.clearNotes()}>
            {copy.clear}
          </Button>
        )}
      </Card.Content>
    </Card>
  );
});
