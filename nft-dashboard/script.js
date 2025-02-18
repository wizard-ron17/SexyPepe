const nftIds = [
    "1bac87ae53b80e45aa9de247f2715b10425795374585b85f1f6c17b64f372a00",
    "d01b6cf9dc5407ab2913be69e31bef98341d4edffe1856bed6df9d360d009500",
    "5a1bc143e157d1b21c353e6b4abbac26132f00e8ae02b96a8f36d7dff6a51100",
    "939a6bff01dfc73ce65421b74cd12be628a17142813a4ab0cc2485b736b35e00",
    "92c96be1b979a2182964505d9ecf0d944a026a400dd1909cb70d380e85714d00",
    "be8bc41f3aaa84739bd08bd62aaa80fa90fc236eadf468b6985b2d2375eb8e00",
    "a9421285aed0eb567cf308496a069dcf698dbe14c3d32860aaeeb78214da2b00",
    "2700d5c2f1b85a4f75e9e9acd11e20b5e62006d50764d820111e6a23352c8e00",
    "eeae75d52bccbe0615b689ac63e90d1c9f3d393790e277d3f0fa531e66654600",
    "a35dbe2b2d472c6438add4cbf3cef4b80e6c6e64c17da943430fc64ad750bb00",
    "cac0121490c3fa41c7f3ff1bb19e0f8b622e16d9f5406bda9a419d6f9c5bc500",
    "2f6a045d4758318524a15168652fb4e3cdea1c972e4e858b54d6b966fc631c00",
    "4c430c621e8929b86da8ffc1017546b807361766f6a85b5d9b92523cce5d6e00",
    "21913a13b2804e72224407cb96bcd5f3c0b0ed267019b5397f3fee34957d9d00",
    "0eb9bb10835ba90ec78c1c041ac8a9ea69aba0061c865ea1577e3b830ccf3c00",
    "123e342499da50441b4bb684402c9735d9246e207785edb6cba7684dd6248b00",
    "ebb979b837bf457fb3ff336eed33e0f6e871caecba0274f816635dc85cf58200",
    "8fb94538786e9f928437a14d11fc209c326e7892e65321fdcc03235c7dc43b00",
    "256e8575f1df2fa7468df2fa34a17a6d1e97bc8261bd1b74d13718cb86437000",
    "77f3d96ca3eeaaae583a16fac5ac32a9ec918f4c637a1827b024d324656d9200",
    "afd686fb47067f0a97674e11b358b00a454c5180f0993bf891a6ea3bf9ae9000",
    "480249cce67693827b75243256c3931724a7b639085e6862645b7357b5bc3e00",
    "d896008604ea3443fee2c484754d7501b4c81a5fe4c86aef13af10299e9fc400",
    "9fd48cc529335dc4bf3ec6037a7129ee575e9edc695070667f7c7947a2844300",
    "c2e1a0a76effabdf36022d1a0798caa080aa76db5a133430868a20a089b1fa00",
    "6cca00d095610d29eb1583463f0243e9e4c45ebeeb5dd1427a847d4495fbdb00",
    "204f32ea7daeca52807c800ceb85531746141da10496ee73879fdc866579a000",
    "5b2c5c1a55da941dcf4575fc4e90e2f6ce258aee60dd6b60baf0d82c7cc9a400",
    "7132f56297516a716192ba7e3c2abdb661b91a8b7177ab9c6de1ddac38045a00",
    "4189c3369c220ac3111fa1fa0feebcc354ba770c962dd263cbd5011283120c00",
    "e0d42a442b3d23c14e1019fdcbe4c60cd9cbdf5e2cb8aa7bbc3d8a7432c3ec00",
    "d93ee649044f375bb5aec60ea2b07960b3a6a0a254e678ff9b6fceb39e53b500",
    "f3534d118c1bd07cb76e9677f922586c7fae57f218c54e8b0137f720c3033900",
    "d7753eafb2f67f241e7f26c465eca671a1ef29e1ae8beecabc73631c3aba5600",
    "173671c52c8d2c7ce1410d5ae42331d74819f28f5569eb36783b0edfac20ae00",
    "d78863f14c85b0cd1cf16a0feec55510f4f8d50769cc097a6a9a044de8cdb700",
    "578bc5adcd8c929d2df9853a19cf9c1b9041b468a5869370403f24f416cd3100",
    "c2b2da66687a024f6d8435a09cfbace59bb01901ccee6352af9b894b364fad00",
    "edc6d622968279b66b382db24ab1a97f722e3780130f9cd32385b056d6a8ec00",
    "0c97e529004c199907da2a06714d2ab9d6cdc0f92ee4476d30b2f9cf43ca7b00",
    "16dba3b7591c9b95de8c254821475be7565d4c8dd5bbc5c5a3db28ae9c97b000",
    "7e2bdbeb7e5dc50ac8f461192c7ca77ae1d5d3cf7d1d79946129095cdbe96600",
    "6a5c5f4962a170501ce9450d1fa6736304307f2cda47473a4711966f56a49d00",
    "bc2221c09aaaf3ab537189611103b0ae7b5080e6bb3b1f5e5d1543bae690f600",
    "218be599c8e03aff7f0611a5c3e3b9adfd2f944180a1ca011803f7f05d665800",
    "c7bb4d828dbbc692ea50eae8b31c43e03925d2efdf2e60b8571381ec7f734b00",
    "ab50ab8007dde3d824bd290dfb05e1c2a92360908d5a7fab684b52d1677c5000",
    "0b0368b9d9a1fdc18a034fefcdea95e7403f2d39a814ffa9f1f345eb43cf7500",
    "16bcd11dbcbd1a6d899a3c2ab41c7f8ec9860bc878d9d91a826b4731302dc300",
    "2f30faf0cfd1e7f3114239a9de3c47b03b9d066447d5c9b57444db13499f7700",
    "bd1cd7b8b5c6cf8503d31329c9d5bfd5279004b2bcb8917ed0f626f7aa44b900",
    "2d8bd2a1991f6c728d36ba9c6c34af7e3b3f8164b2fbb49bbc16af7c363d9800",
    "93bf4f41e6f0139b096600cf9ace769ef544e731f5aaee67d79509bb8143d800",
    "ce3e94de587cdb6b874e1c21efd69f4a6e02bcecedacde52db3b506c49daec00",
    "dc8400b8b043ca187e452f52786922034e6581ba23d611091ec7dee7b4b57000",
    "35920287aebba8fce88cd0b1a4a78ee803fc68bd218e780a7f3c2f31f6ea0200",
    "dcc7ae2ba37d2f4d5d2425297f7346b8cf930cdaa2c82f7125b39a13c1afd300",
    "c9f113d285101887309cc789e81638fbc4944d02d4b97f27361ecf43d80a1c00",
    "728fa51afba1bc20c1698994b35039f1c425da764245ab68ec681e0971a39600",
    "230d674179fa2e8ed8754c0ea2f694ca820c2c64d86b46411935a6cda5f3e000",
    "5f2ee3fe913dcbbee28f72b14fd77d48e93dd0d236409a42678bfb9f3b32f400",
    "f3008b4984a5b73418ef6874c5e45956163c475d8fa7aa6ef285457ae2761a00",
    "98306bcdea81b7ffbe21e09c64ee20279160464f92256e87e05339effba74800",
    "62045c553e5ffb4061bda3137e32ea86c18d26e019bb20be6566167054829d00",
    "ccfc316c5bd2f044146699de8f514be71e1bd6df95cc887939a5295ad7b44300",
    "42c3c61a9c6540346feee750729a033d997e57c1b7bda0b82b62224fedf61100",
    "b6484669e4d2ca023aa1bf9ab154f4b2e85a3ca3e060e1efed5ed0b6af10f800",
    "f8e860746bbd53674c13b83379b95359255f3809beb3fa7d5518558db639f700",
    "f03bf3b0cd814b5ddd89915001e65476a8e74c1bbf25b12f4aff94556b63d500"
];

const rarityMap = {
    0: "Common", 1: "Common", 2: "Rare", 3: "Rare", 4: "Common",
    5: "Common", 6: "Rare", 7: "Rare", 8: "Common", 9: "Rare",
    10: "Rare", 11: "Rare", 12: "Rare", 13: "Rare", 14: "Rare",
    15: "Common", 16: "Common", 17: "Common", 18: "Common", 19: "Common",
    20: "Common", 21: "Common", 22: "Common", 23: "Legendary", 24: "Common",
    25: "Common", 26: "Common", 27: "Common", 28: "Common", 29: "Common",
    30: "Rare", 31: "Common", 32: "Common", 33: "Common", 34: "Common",
    35: "Common", 36: "Common", 37: "Common", 38: "Legendary", 39: "Common",
    40: "Rare", 41: "Common", 42: "Common", 43: "Legendary", 44: "Common",
    45: "Common", 46: "Common", 47: "Common", 48: "Rare", 49: "Rare",
    50: "Common", 51: "Rare", 52: "Common", 53: "Rare", 54: "Common",
    55: "Legendary", 56: "Common", 57: "Rare", 58: "Common", 59: "Legendary",
    60: "Common", 61: "Common", 62: "Legendary", 63: "Rare", 64: "Common",
    65: "Common", 66: "Common", 67: "Common", 68: "Rare"
};

const holderMap = new Map();
let totalRewards = 0;
let totalScore = 0;

function truncateAddress(address) {
    return `${address.substring(0, 8)}...${address.substring(address.length - 4)}`;
}

function getNftIndex(id) {
    return nftIds.indexOf(id);
}

function showLoading() {
    const splashScreen = document.createElement('div');
    splashScreen.style.position = 'fixed';
    splashScreen.style.top = '0';
    splashScreen.style.left = '0';
    splashScreen.style.width = '100%';
    splashScreen.style.height = '100%';
    splashScreen.style.backgroundColor = 'rgba(0, 0, 0)';
    splashScreen.style.zIndex = '9999';
    splashScreen.style.display = 'flex';
    splashScreen.style.flexDirection = 'column';
    splashScreen.style.justifyContent = 'center';
    splashScreen.style.alignItems = 'center';
    splashScreen.style.transition = 'opacity 0.5s ease';

    splashScreen.innerHTML = `
        <img src="https://sexy-pepe.xyz/exy_pfp.webp" style="width: 200px; border-radius: 15px; animation: fadeIn 1s;"/>
        <div style="color: white; font-size: 1.5rem; margin-top: 10px;">$exy Cards</div>
        <div style="width: 200px; margin-top: 20px;">
            <progress id="splashLoadingBar" value="0" max="100" style="width: 100%; height: 10px; border-radius: 5px; background-color: grey;"></progress>
        </div>
    `;

    const style = document.createElement('style');
    style.innerHTML = `
        #splashLoadingBar {
            -webkit-appearance: none;
            appearance: none;
            border-radius: 5px;
            background-color: grey;
        }
        #splashLoadingBar::-webkit-progress-bar {
            background-color: grey;
            border-radius: 5px;
        }
        #splashLoadingBar::-webkit-progress-value {
            background-color: gold;
            border-radius: 5px;
        }
        #splashLoadingBar::-moz-progress-bar {
            background-color: gold;
            border-radius: 5px;
        }
    `;
    document.head.appendChild(style);
    document.body.appendChild(splashScreen);

    return {
        updateProgress: (progress) => {
            const loadingBar = document.getElementById('splashLoadingBar');
            if (loadingBar) {
                loadingBar.value = progress;
            }
        },
        remove: () => {
            splashScreen.style.opacity = '0';
            setTimeout(() => {
                if (document.body.contains(splashScreen)) {
                    document.body.removeChild(splashScreen);
                }
            }, 500);
        }
    };
}

async function fetchData() {
    const loader = showLoading();
    try {
        const errorDiv = document.getElementById('error');
        const holdersDiv = document.getElementById('holders');
        const totalHoldersDiv = document.getElementById('totalHolders');
        const totalNFTsDiv = document.getElementById('totalNFTs');
        const currentRewardsDiv = document.getElementById('currentRewards');

        errorDiv.style.display = 'none';
        holdersDiv.innerHTML = '';
        holderMap.clear();

        const batchSize = 3; // Number of requests per batch
        const delayBetweenBatches = 1; // Delay in milliseconds between batches
        const progressPerNFT = 100 / nftIds.length;
        let currentProgress = 0;

        for (let i = 0; i < nftIds.length; i += batchSize) {
            const batch = nftIds.slice(i, i + batchSize);
            await Promise.all(batch.map(async (id) => {
                try {
                    const response = await fetch(`https://backend.mainnet.alephium.org/tokens/holders/token/${id}`, {
                        method: 'GET',
                        headers: { 'Content-Type': 'application/json' },
                    });
                    if (!response.ok) {
                        throw new Error(`Network response was not ok for ID ${id}`);
                    }
                    const data = await response.json();
                    currentProgress += progressPerNFT;
                    loader.updateProgress(Math.min(90, currentProgress));

                    data.forEach(holder => {
                        if (holder.balance === "1") {
                            const address = holder.address;
                            if (!holderMap.has(address)) {
                                holderMap.set(address, { address, count: 0, nfts: [] });
                            }
                            const holderInfo = holderMap.get(address);
                            holderInfo.count++;
                            holderInfo.nfts.push({ id, rarity: rarityMap[getNftIndex(id)] });
                        }
                    });
                } catch (error) {
                    console.error("Error fetching NFT data:", error);
                }
            }));
            await new Promise(resolve => setTimeout(resolve, delayBetweenBatches));
        }

        loader.updateProgress(95);

        const rewardsResponse = await fetch('https://backend.mainnet.alephium.org/addresses/15vrr6bQNgQHkJ3TrGxoY7GnthRiRx1M4ESkdik7TaXAF/tokens-balance?limit=100&page=1');
        if (!rewardsResponse.ok) {
            throw new Error('Failed to fetch current rewards');
        }
        const rewardsData = await rewardsResponse.json();
        const currentRewardToken = rewardsData.find(token => token.tokenId === "cad22f7c98f13fe249c25199c61190a9fb4341f8af9b1c17fcff4cd4b2c3d200");
        totalRewards = currentRewardToken ? (parseFloat(currentRewardToken.balance) / Math.pow(10, 18)).toFixed(2) : 0;

        currentRewardsDiv.textContent = `${totalRewards} $EX`;

        const holders = Array.from(holderMap.values());
        totalHoldersDiv.textContent = `${holders.length}`;
        totalNFTsDiv.textContent = `${holders.reduce((acc, holder) => acc + holder.count, 0)}`;

        const rewardsPerCommon = (totalRewards * 0.01).toFixed(2);
        const rewardsPerRare = (totalRewards * 0.02).toFixed(2);
        const rewardsPerLegendary = (totalRewards * 0.03).toFixed(2);

        const rewardsPerRarityDiv = document.getElementById('rewardsPerRarity');
        rewardsPerRarityDiv.innerHTML = `
            <p>Common: ${rewardsPerCommon} $EX</p>
            <p>Rare: ${rewardsPerRare} $EX</p>
            <p>Legendary: ${rewardsPerLegendary} $EX</p>
        `;

        renderHolders(holders, totalRewards);
        loader.updateProgress(100);
        setTimeout(() => loader.remove(), 500);

    } catch (error) {
        console.error("Error fetching NFT data:", error);
        const errorDiv = document.getElementById('error');
        errorDiv.style.display = 'block';
        errorDiv.textContent = `Error: ${error.message}`;
        loader.remove();
    }
}

function renderHolders(holders, totalRewards) {
    const holdersDiv = document.getElementById('holders');
    if (!holdersDiv) {
        console.error("Holders div not found");
        return;
    }

    const holdersWithScores = holders.map(holder => {
        const score = holder.nfts.reduce((acc, nft) => {
            if (nft.rarity === "Common") return acc + 1;
            if (nft.rarity === "Rare") return acc + 2;
            if (nft.rarity === "Legendary") return acc + 3;
            return acc;
        }, 0);
        holderMap.set(holder.address, { ...holder, score });
        return { ...holder, score };
    });

    const sortedHolders = holdersWithScores.sort((a, b) => b.score - a.score);
    totalScore = sortedHolders.reduce((acc, holder) => acc + holder.score, 0);

    const holdersHTML = sortedHolders.map((holder, index) => {
        const address = holder.address || "Unknown Address";
        const holderRewards = totalScore > 0 ? (holder.score / totalScore * totalRewards).toFixed(2) : 0;

        return `
            <div class="holder-card" onclick="showHolderModal('${holder.address}', ${totalRewards})">
                <div class="holder-header">
                    <span class="rank">${index + 1}.</span>
                    <span class="address">
                        <a class="link" href="https://explorer.alephium.org/addresses/${address}" target="_blank">
                            ${truncateAddress(address)}
                        </a>
                    </span>
                    <span class="nft-count">${holder.count} NFTs</span>
                </div>
                <div class="holder-rewards">Rewards: ${holderRewards} $EX (${((holder.score / totalScore) * 100).toFixed(0)}% of Rewards)</div>
                <div class="nft-grid">
                    ${holder.nfts
                        .sort((a, b) => a.id - b.id)
                        .map(nft => `
                            <div class="nft-item rarity-${nft.rarity}">
                                <a class="link" href="https://alphaga.app/nft/${nft.id}" target="_blank">
                                    <span>#${getNftIndex(nft.id)}</span>
                                    <span class="rarity-${nft.rarity}">${nft.rarity}</span>
                                </a>
                            </div>
                        `).join('')}
                </div>
            </div>
        `;
    }).join('');

    holdersDiv.innerHTML = holdersHTML;
}

function init() {
    console.log("Initialization complete.");
}

document.addEventListener('DOMContentLoaded', async () => {
    await fetchData();
});

init();

document.getElementById('formatAirdropButton').addEventListener('click', () => {
    const holders = Array.from(holderMap.values());
    let addresses = '';

    holders.forEach(holder => {
        const score = holder.nfts.reduce((acc, nft) => {
            if (nft.rarity === "Common") return acc + 1;
            if (nft.rarity === "Rare") return acc + 2;
            if (nft.rarity === "Legendary") return acc + 3;
            return acc;
        }, 0);
        
        for (let i = 0; i < score; i++) {
            addresses += `${holder.address}\n`;
        }
    });

    const addressCountElement = document.getElementById('addressCount');
    if (addressCountElement) {
        addressCountElement.innerHTML = `Total Addresses: ${addresses.trim().split('\n').length}/100 <span id="addressIcon"></span>`;
    }

    const addressIcon = document.getElementById('addressIcon');
    if (addressIcon) {
        const totalAddresses = addresses.trim().split('\n').length;
        addressIcon.innerHTML = totalAddresses === 100 ? ' ✅' : ' ❌';
        addressIcon.style.color = totalAddresses === 100 ? 'green' : 'red';
    }

    const airdropAddressesTextarea = document.getElementById('airdropAddresses');
    if (airdropAddressesTextarea) {
        airdropAddressesTextarea.value = addresses.trim();
    }

    document.getElementById('airdropModal').classList.add('show');
});

document.querySelector('.close').onclick = function() {
    document.getElementById('airdropModal').classList.remove('show');
}

document.getElementById('copyButton').addEventListener('click', () => {
    const addressesText = document.getElementById('airdropAddresses').value;
    navigator.clipboard.writeText(addressesText).then(() => {
        alert('Addresses copied to clipboard!');
    });
});

window.onclick = function(event) {
    const airdropModal = document.getElementById('airdropModal');
    const holderModal = document.getElementById('holderModal');
    
    if (event.target === airdropModal) {
        airdropModal.classList.remove('show');
    }
    if (event.target === holderModal) {
        holderModal.classList.remove('show');
    }
}

function copyTokenId() {
    const tokenId = "cad22f7c98f13fe249c25199c61190a9fb4341f8af9b1c17fcff4cd4b2c3d200";
    navigator.clipboard.writeText(tokenId).then(() => {
        alert('$EX Token ID copied to clipboard!');
    });
}

function showHolderModal(address, totalRewards) {
    const modal = document.getElementById('holderModal');
    const modalContent = modal.querySelector('.modal-content');
    
    const holder = holderMap.get(address);
    if (!holder) {
        console.error("Holder not found for address:", address);
        alert("Holder not found for the provided address.");
        return;
    }

    const adjustedRewards = holder.score > 0 ? (holder.score / 100 * totalRewards).toFixed(2) : 0;

    modalContent.innerHTML = `
        <span class="close">&times;</span>
        <h2>Holder Information</h2>
        <div class="holder-header">
            <span class="address">
                <a class="link" href="https://explorer.alephium.org/addresses/${holder.address}" target="_blank">
                    ${truncateAddress(holder.address)}
                </a>
            </span>
            <span class="nft-count">${holder.count} NFTs</span>
        </div>
        <div class="holder-rewards">Rewards: ${adjustedRewards} $EX</div>
        <div class="nft-grid">
            ${holder.nfts.map(nft => `
                <div class="nft-item rarity-${nft.rarity}">
                    <a class="link" href="https://alphaga.app/nft/${nft.id}" target="_blank">
                        <span>#${getNftIndex(nft.id)}</span>
                        <span class="rarity-${nft.rarity}">${nft.rarity}</span>
                    </a>
                </div>
            `).join('')}
        </div>
    `;
    
    modal.classList.add('show');

    modalContent.querySelector('.close').onclick = function() {
        modal.classList.remove('show');
    };
}

document.getElementById('searchButton').addEventListener('click', () => {
    const addressInput = document.getElementById('addressInput').value.trim();
    showHolderModal(addressInput, totalRewards);
});
