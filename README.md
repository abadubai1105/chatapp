# IMPORTANT GUIDE

@theblockchaincoders

Build your first web3 API start-up, in which you can provide users to upload the NFT to IPFS, and allow them to make API requests to fetch all the IPFS blockchain smart contract data.

## NOTE 
- Khi clone về ae nên:
  + git branch <tên branch của mình> (ví dụ: git branch nghiapro1 để chỉnh sửa có gì còn biết mà return).
  + git switch <tên branch của mình> (ví dụ: git switch nghiapro1)
- Sau khi chỉnh sửa xong ae muốn push:
  + git add .
  + git commit -m "<tên phần mình sửa>" (ví dụ: git commit -m "Thêm nút add friend" (khuyến khích ghi tiếng Anh)).
  + git push --set-upstream origin <tên branch> (ví dụ: git push --set-upstream origin nghiapro1).
- Khi đã clone, ae muốn cập nhật cái mà đồng đội mình vừa hoàn thành.
  + git pull
  + đổi về branch của mình.

## Run chain 
### Software Dependencies
  - Go: ^1.21
  - Foundry: ^0.2
  - make: ^3
  - Node: ^20
  - pnpm ^8
  - Rust(không nhớ có cần không, nhma nếu tại install:foundry trong "lưu ý 2" mà bị lỗi "cargo" thì ae install sau cũng được)
### Lưu ý 1: mỗi lần chạy chain xong phải clean chain và lần sau chạy lại từ đầu
  - clone https://docs.celestia.org/developers/optimism-devnet (lưu ý chạy bằng WSL2 và folder phải clone trên ổ linux)
  - làm các bước như hướng dẫn cho tới mục "START DEVNET" quay lại đọc "Lưu ý 2" và không chạy theo Tuturial nữa

### Lưu ý 2: tại bước START DEVNET chạy theo hướng dẫn sau đây(các lần sau chạy lại chain thì bắt đầu từ bước này)
  - mở wsl trong thư mục optisism vừa clone:
    + run: pnpm install:foundry
    + run: pnpm check:foundry : terminal báo "Foundry version matches the expected version." là thành công
    + mở sẵn Docker Desktop
    + run: make devnet-up => trừ "op_stack_go_builder-1" còn lại 7/8 image docker chạy là done
  - khi không sử dụng chain nữa:
    + run: make devnet-down
    + run: make devnet-clean
  - muốn chạy lại chain quay lại chạy từ "lưu ý 2"

## Deploy Dapp to chain
  - chỉnh sửa file .env như hướng dẫn
  - Run chain
  - mở termial tại thư mục chatapp(cmd/powershell) run: "npx hardhat run scripts/deploy.js --network localhost" để chạy
  - terminal xuất hiện "Contract Address" là chạy thành công
