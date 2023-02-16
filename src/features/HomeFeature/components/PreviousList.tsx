import { styled } from '@/styles/stitches.config';
import { Button, Text } from '@/components';

export const StyledPreviousList = styled('ul', {
  listStyle: 'none',
  margin: 0,

  li: {
    marginTop: '$2',
  },
});

export function PreviousList({
  items,
  onSelect,
}: {
  items: string[];
  onSelect: (item: string) => void;
}) {
  return (
    <div>
      <Text variant="bold">Previous searches:</Text>
      <StyledPreviousList>
        {items.map((item) => (
          <li key={item}>
            <Button type="button" onClick={() => onSelect(item)}>
              {item}
            </Button>
          </li>
        ))}
      </StyledPreviousList>
    </div>
  );
}
