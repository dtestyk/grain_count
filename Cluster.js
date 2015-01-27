function Cluster()
{
  //this.M = [[1,0],[0,1]];
  //this.M1 = [[1,0],[0,1]];
  //this.a = [0,0];
  this.M = [
    [1,0,0],
    [0,1,0],
    [0,0,1]
  ];
  this.M1 = [
    [1,0,0],
    [0,1,0],
    [0,0,1]
  ];
  this.a = [0,0,0];
  this.n = 0;
  this.isEmpty = function(){
    return (this.n==0);
  };
  this.center = function(x){
    var xc = [];
    for(var i=0; i<this.a.length; ++i){
      xc[i] = x[i]-this.a[i];
    }
    return xc;
  };
  this.create = function(xx){
  ///xx --- array of array coord
    this.n = xx.length;
    for(var k=0; k<this.n; ++k){
      var p = 1 / (k+1);
      var q = 1 - p;
      for(var i=0; i<this.a.length; ++i){
        this.a[i] = this.a[i]*q + xx[k][i]*p;
      }
    }
    
    for(var k=0; k<this.n; ++k){
      var xc = this.center(xx[k]);
      var p = 1 / (k+1);
      var q = 1 - p;
      for(var i=0; i<this.M.length; ++i){
        for(var j=0; j<this.M[i].length; ++j){
          this.M[i][j] = this.M[i][j]*q + xc[i]*xc[j]*p;
        }
      }
    }
  };
  this.add = function(x){
  ///x --- array coord
    ++this.n;
    var p = 1 / this.n;
    var q = 1 - p;
    for(var i=0; i<this.a.length; ++i){
      this.a[i] = this.a[i]*q + x[i]*p;
    }
    var xc = this.center(x);
    for(var i=0; i<this.M.length; ++i){
      for(var j=0; j<this.M[i].length; ++j){
        this.M[i][j] = this.M[i][j]*q + xc[i]*xc[j]*p;
      }
    }
  };
  this.updateReverseMatrix = function(){
    var M = this.M;
    var M1 = [
      [1,0,0],
      [0,1,0],
      [0,0,1]
    ];
    
    //var M1 = [[1,0],[0,1]];
    /*
    var det2 = M[0][0]*M[1][1] - M[0][1]*M[0][1];
    if(Math.abs(det2)>0.01){
      M1[0][0] = M[1][1]/det2;
      M1[0][1] = M[1][0]/det2;
      M1[1][0] = M[0][1]/det2;
      M1[1][1] = M[0][0]/det2;
    }else{
      if(Math.abs(M[0][0])>0.01) M1[0][0] = 1/M[0][0];
      if(Math.abs(M[0][1])>0.01) M1[0][1] = 1/M[0][1];
      if(Math.abs(M[1][0])>0.01) M1[1][0] = 1/M[1][0];
      if(Math.abs(M[1][1])>0.01) M1[1][1] = 1/M[1][1];
    }*/
    this.M1 = M1;
  };
  this.getDist2 = function(x){
    var xc = this.center(x);
    var d = 0;
    for(var i=0; i<this.M1.length; ++i){
      for(var j=0; j<this.M1[i].length; ++j){
        d += xc[i] * this.M1[i][j] * xc[j];
      }
    }
    return d;
  }
}