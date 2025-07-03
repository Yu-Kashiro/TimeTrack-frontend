import { Button, CloseButton, Dialog, Portal } from "@chakra-ui/react";

type DeleteButtonProps = {
  onClick: () => void;
};

export const DeleteButton = ({ onClick }: DeleteButtonProps) => {
  return (
    <Dialog.Root role="alertdialog" placement="center">
      <Dialog.Trigger asChild>
        <Button
          colorPalette="red"
          variant="subtle"
          size="xl"
          color="black"
        >
          削除する
        </Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content style={{ background: "#fff" }}>
            <Dialog.Header>
              <Dialog.Title>
                <p>この出勤記録を削除しますか？</p>
              </Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <p>削除した出勤記録は復元できません</p>
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button variant="outline" color="black">キャンセル</Button>
              </Dialog.ActionTrigger>
              <Button colorPalette="red" onClick={onClick}>
                削除する
              </Button>
            </Dialog.Footer>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};
