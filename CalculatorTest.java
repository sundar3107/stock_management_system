import static org.junit.Assert.*;
import org.junit.Test;

public class CalculatorTest {

    Calculator c = new Calculator();

    @Test
    public void testAdd() {
        assertEquals(10, c.add(5, 5));
    }

    @Test
    public void testSubtract() {
        assertEquals(5, c.subtract(10, 5));
    }

    @Test
    public void testMultiply() {
        assertEquals(25, c.multiply(5, 5));
    }

    @Test
    public void testDivide() {
        assertEquals(5, c.divide(10, 2));
    }
}