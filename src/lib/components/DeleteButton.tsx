import { Button, CloseButton, Dialog, Portal } from "@chakra-ui/react";

type DeleteButtonProps = {
  onClick: () => void;
};

export const DeleteButton = ({ onClick }: DeleteButtonProps) => {
  return (
    <Dialog.Root role="alertdialog" placement="center">
      <Dialog.Trigger asChild>
        <Button colorPalette="red" variant="subtle" size="xl" color="black">
          削除する
        </Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content
            bg="white"
            color="black"
            borderColor="gray.200"
            boxShadow="lg"
            className="chakra-theme light"
          >
            <Dialog.Header>
              <Dialog.Title color="black">
                <p>この出勤記録を削除しますか？</p>
              </Dialog.Title>
            </Dialog.Header>
            <Dialog.Body color="black">
              <p>削除した出勤記録は復元できません</p>
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button variant="outline" color="black" borderColor="gray.300">
                  キャンセル
                </Button>
              </Dialog.ActionTrigger>
              <Button colorPalette="red" onClick={onClick}>
                削除する
              </Button>
            </Dialog.Footer>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" color="black" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};
