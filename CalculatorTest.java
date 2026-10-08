import static org.junit.Assert.*;
import org.junit.Test;

public class CalculatorTest {

    Calculator c = new Calculator();

    @Test
    public void TC01_Addition() {
        try {
            assertEquals(10, c.add(5, 5));
            System.out.println("TC01 - PASS");
        } catch (AssertionError e) {
            System.out.println("TC01 - FAIL");
            throw e;
        }
    }

    @Test
    public void TC02_Subtraction() {
        try {
            assertEquals(5, c.subtract(10, 5));
            System.out.println("TC02 - PASS");
        } catch (AssertionError e) {
            System.out.println("TC02 - FAIL");
            throw e;
        }
    }

    @Test
    public void TC03_Multiplication() {
        try {
            assertEquals(25, c.multiply(5, 5));
            System.out.println("TC03 - PASS");
        } catch (AssertionError e) {
            System.out.println("TC03 - FAIL");
            throw e;
        }
    }

    @Test
    public void TC04_Division() {
        try {
            assertEquals(5, c.divide(10, 2));
            System.out.println("TC04 - PASS");
        } catch (AssertionError e) {
            System.out.println("TC04 - FAIL");
            throw e;
        }
    }
}