<template>
  <div class="glitch-container">
    <div class="glitch">
      弹幕挑战
    </div>
  </div>
</template>

<script>
export default {
  name: 'Glitch'
}

</script>

<style scoped>
  .glitch-container {
    position: absolute;
    top: 100px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-items: center;
  }

  .glitch {
    position: relative;
    width: 100%;
    color: #ffffff;
    text-align: center;
    font-size: 100px;
    font-weight: bolder;
  }

  .glitch::before {
    position: absolute;
    top: 0;
    left: -3px;
    width: 100%;
    height: 140px;
    content: '弹幕挑战';
    display: block;
    text-shadow: 2px 0 rgb(82, 93, 248);
    animation: glitch 2s alternate infinite;
  }

  .glitch::after {
    position: absolute;
    top: 0;
    left: 3px;
    width: 100%;
    height: 140px;
    content: '弹幕挑战';
    display: block;
    text-shadow: -2px 0 rgb(236, 60, 75);
    background: black;
    z-index: 20;
    animation: glitch 3s alternate infinite;
  }

  @keyframes glitch {
    0% {
      clip: rect(20px, 999px, 55px, 0);
    }

    20% {
      clip: rect(20px, 999px, 55px, 0);
    }

    21% {
      clip: rect(60px, 999px, 70px, 0);
    }

    30% {
      clip: rect(50px, 999px, 70px, 0);
    }

    40% {
      clip: rect(50px, 999px, 70px, 0);
    }

    50% {
      clip: rect(50px, 999px, 70px, 0);
    }

    51% {
      clip: rect(80px, 999px, 105px, 0);
    }

    80% {
      clip: rect(80px, 999px, 105px, 0);
    }

    81% {
      clip: rect(110px, 999px, 130px, 0);
    }

    90% {
      clip: rect(110px, 999px, 130px, 0);
    }

    100% {
      clip: rect(110px, 999px, 130px, 0);
    }
  }
</style>
