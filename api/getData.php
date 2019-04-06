<?php
    require "connection.php";
    if($conn==false){
        echo "Error!";
    }else{
        $method = $_POST['method'];
        // $method = 2;
        if($method==1){
            $sql = "SELECT * FROM products";
            $result=mysqli_query($conn, $sql);
            // Associative array
            while($row=mysqli_fetch_assoc($result)){
                $rows[] = $row;
            }

            // Free result set
            mysqli_free_result($result);

            mysqli_close($conn);
            echo json_encode($rows);
        } else if($method==2){
            $data = $_POST['data'];
            // $data = array(1, 2);
            $stringdata = implode(',', $data);
            $sql = "SELECT name, price FROM products WHERE id IN ($stringdata)";
            $result=mysqli_query($conn, $sql);
            $total = 0;
            $names = '';
            $prices = '';
            // Associative array
            while($row=mysqli_fetch_assoc($result)){
                $total += $row['price'];
                $names .= $row['name'] . ',';
                $prices .= $row['price'] . ',';
            }
            // Free result set
            mysqli_free_result($result);
            $names = rtrim($names,',');
            $prices = rtrim($prices,',');
            $sql = "INSERT INTO orders (products, prices, total) VALUES ('$names', '$prices', $total)";
            if ($conn->query($sql) === TRUE) {
                echo json_encode("Success");
            } else {
                echo "Error: " . $sql . "<br>" . $conn->error;
            }
            $conn->close();
        }else if($method==3){
            $sql = "SELECT * FROM orders";
            $result=mysqli_query($conn, $sql);
            // Associative array
            $rows = [];
            while($row=mysqli_fetch_assoc($result)){
                $rows[] = $row;
            }

            // Free result set
            mysqli_free_result($result);
            mysqli_close($conn);
            echo json_encode($rows);
        }
    }
?>