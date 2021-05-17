const saveMnemonic = (mnemonic) => {
  localStorage.setItem('mnemonic', mnemonic);
};

const getMnemonic = () => {
  return localStorage.getItem('mnemonic');
};

const saveEncryptedWallet = (wallet) => {
  localStorage.setItem('encWallet', wallet);
};

const getEncryptedWallet = () => {
  return localStorage.getItem('encWallet');
};

const savePrivateKey = (privateKey) => {
  localStorage.setItem('privateKey', privateKey);
};

const getPrivatekey = () => {
  return localStorage.getItem('privateKey');
};

const saveAddress = (address) => {
  localStorage.setItem('address', address);
};

const getAddress = () => {
  return localStorage.getItem('address');
};

const saveCurrentNetwork = (network) => {
  localStorage.setItem('currentNetwork', network);
};

const getCurrentNetwork = () => {
  return localStorage.getItem('currentNetwork');
};

const resetSendForm = () => {
  $('#inputSendToAddress').val('');
  $('#inputAmount').val('');
};

const resetPasscodeFields = () => {
  $('#inputPasscode').val('');
  $('#inputConfirmPasscode').val('');
  $('#inputVerifyPasscode').val('');
  $('#inputMnemonic').val('');
};

function isNumberKey(evt) {
  var charCode = evt.which ? evt.which : evt.keyCode;
  if (charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57))
    return false;
  return true;
}

const networks = [
  {
    name: 'rumsan',
    url: 'http://172.110.7.136:8548',
    display: 'Rumsan Network',
    default: true,
  },
  {
    name: 'mainnet',
    url: 'https://mainnet.infura.io/v3/ae22018377b14a61983be979df457b20',
    display: 'Mainnet (Ethereum)',
  },
  {
    name: 'rinkeby',
    url: 'https://rinkeby.infura.io/v3/ae22018377b14a61983be979df457b20',
    display: 'Rinkeby',
  },
  {
    name: 'binance',
    url: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
    display: 'Binance',
  },
];

const getDefaultNetwork = () => {
  return networks.find((d) => d.default);
};

const getNetworkByName = (name) => {
  if (!name) return getDefaultNetwork();
  return networks.find((d) => d.name === name);
};


const signMessage = () => {
  $("#content").hide();
  $("#loader").show();

  const message = web3.sha3( $('#message').val() )
  console.log('message', message)

  web3.eth.sign(App.account, message, function (err, result) {
    console.log(err, result)
    $('form').trigger('reset')
    App.msg = message
    $('#msg').html('message:' + ' ' + message)
    App.signature = result
    $('#signature').html('signature:' + ' ' + result)
    $('#verify').show()
    $("#content").show();
    $("#loader").hide();
    window.alert('Message signed!')
  })
}
